import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import  { useEffect, useState} from "react";
import { getCookie } from "react-use-cookie";


const App = () => {
  const sessionToken = getCookie("sessionToken");
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch(`http://localhost:3000/session/validate_token?token=${sessionToken}`);
        const data = await response.json();
        console.log(data)
        const { valid, user } = data.data;
        const {username} = user;
        setFullname(`${username}`);
        
        if (!valid) {
          navigate("/");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors de la validation du token.");
        console.log(error)
        navigate("/");
      }
    };

    validateToken();
  }, [sessionToken, navigate]);
  return (
    <div className="w-full p-6">
      <Navbar fullname={fullname} />
      <Outlet />
    </div>
  );
};
export default App
