import { NavLink } from "react-router-dom";
import React from 'react';

export default function Navbar() {
    const isAuthenticated = () => {
    return !!localStorage.getItem('token');
    };
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Rocket logo" style={{"width" : 12 + '%'}} src="../src/assets/images/rocketLogo.png"></img>
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" to="/admin/create">
          Create Employee
        </NavLink>
        {!!isAuthenticated && 
            <button onClick={()=>{
                localStorage.removeItem('token');
                window.location.reload();
            }}> logout</button>
        }
      </nav>
    </div>
  );
}