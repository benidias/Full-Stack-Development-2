import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Modal, Alert } from 'react-bootstrap';

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    region: "",
    rating: "",
    fee:""
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:3000/admin/${params.id.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/admin");
        return;
      }
      setForm(record);
    }
    fetchData();
    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowConfirmation(true);
  };

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        // if we are adding a new record we will POST to /record.
        response = await fetch("http://localhost:3000/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
        if (!response.ok) {
            setShowAlertError(true)
            setShowConfirmation(false)
            setTimeout(() => {
              setShowAlertError(false);
            }, 5000);
            throw new Error(`HTTP error! status: ${response.status}`);
            
        }else{
          setShowAlertSuccess(true)
          setShowConfirmation(false)
          setTimeout(() => {
            setShowAlertSuccess(false);
            navigate("/admin/recordList");
          }, 5000);
          
        }
      } else {
        // if we are updating a record we will PATCH to /record/:id.
        response = await fetch(`http://localhost:3000/admin/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        setShowAlertError(true)
        setShowConfirmation(false)
        setTimeout(() => {
          setShowAlertError(false);
        }, 5000);
        throw new Error(`HTTP error! status: ${response.status}`);
      }else{
        setShowAlertSuccess(true)
        setShowConfirmation(false)
        setTimeout(() => {
          setShowAlertSuccess(false);
          navigate("/admin/recordList");
        }, 5000);
        
      }
    } catch (error) {
      setShowAlertError(true)
      setShowConfirmation(false)
        setTimeout(() => {
          setShowAlertError(false);
        }, 5000);
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", region: "", rating: "", fee:"" });
      
    }
  }
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  // This following section will display the form that takes the input from the user.
  return (
    <>
    {showAlertError && (
      <Alert variant="danger" onClose={() => setShowAlertError(false)} dismissible>
        Agent not saved.
      </Alert>
    )}
    {showAlertSuccess && (
        <Alert variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
          Agent saved successfully
        </Alert>
      )}
      <h3 className="text-lg font-semibold p-4">Create/Update Employee Record</h3>
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Employee Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="First Last"
                    value={form.name}
                    onChange={(e) => updateForm({ name: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Region
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="region"
                    id="region"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="north, south, east, west"
                    value={form.region}
                    onChange={(e) => updateForm({ region: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Rating
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="add rating"
                    value={form.rating}
                    onChange={(e) => updateForm({ rating: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="fee"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Fee
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="number"
                    name="fee"
                    id="fee"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="add rating"
                    value={form.fee}
                    onChange={(e) => updateForm({ fee: e.target.value })}
                  />
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <input
          type="submit"
          value="Save Employee Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
        <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                <Modal.Header closeButton>
                  <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to save employee record ?</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseConfirmation}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={onSubmit}>
                    Confirm
                  </Button>
                </Modal.Footer>
              </Modal>
      </form>
    </>
  );
}