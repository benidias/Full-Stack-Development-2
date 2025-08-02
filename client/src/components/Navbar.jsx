import { NavLink } from "react-router-dom";
import React from 'react';
import { useEffect } from "react";
import { useState } from "react";

export default function Navbar() {
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };
  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/admin">
          <img alt="Rocket logo" style={{"width" : 12 + '%'}} src="../src/assets/images/rocketLogo.png"></img>
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