import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import useCookie from 'react-use-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [cookie, setCookie] = useCookie('sessionToken');

  const handleLogin = async (e) => {
    
    e.preventDefault();

    try {
      
      const res = await axios.post('http://localhost:3000/login', { username, password });
      console.log(res)
      if (res.status === 404) {
        setShowAlertError(true);
        setTimeout(() => {
          navigate("/unauthorized");
        }, 5000);
      }else if (res.status === 200) {
        // setShowAlertSuccess(true);

        

        const sessionResponse = await fetch(`http://localhost:3000/session/${res.data._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(sessionResponse);

        const sessionData = await sessionResponse.json();
        console.log("sessionData");
        console.log(sessionData);

        if (sessionResponse.ok) {
          setCookie(sessionData.data.token);
          localStorage.setItem('token', res.data.token);
          setShowAlertSuccess(true);
          setTimeout(() => {
            navigate("/admin");
          }, 4000);
        } else {
          console.log("unauthorized")
          setShowAlertError(true);
          setTimeout(() => {
            navigate("/unauthorized");
          }, 5000);
        }
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
      // localStorage.setItem('token', res.data.token);
      // setShowAlertSuccess(true);
      
      // setTimeout(() => {
      //     navigate("/admin");
      //   },5000); 
    } catch (err) {
      setShowAlertError(true);
      setTimeout(() => {
        navigate("/unauthorized");
      }, 5000);
      // navigate('/unauthorized')
      console.log(err)
      ; 
    }
  };

  return (
    <>
    {showAlertError && (
      <Alert variant="danger" onClose={() => setShowAlertError(false)} dismissible>
        Connexion échouée. Veuillez réessayer.
      </Alert>
    )}
    {showAlertSuccess && (
        <Alert variant="success" onClose={() => setShowAlertSuccess(false)} dismissible>
          Connexion acceptée.
        </Alert>
      )}
    <div style={{ textAlign: 'center', margin: '20px 250px',  padding: '20px' }}>
    <form onSubmit={handleLogin}>
      <input
        
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    
    </div>
    </>
  );
};

export default Login;
