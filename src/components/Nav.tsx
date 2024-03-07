import React from "react";
import { Link } from "react-router-dom";

export function Nav() {
    
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-xl">Home</Link>
      <Link to="/login" className="text-xl">Login</Link>
      <Link to="/grimorio" className="text-xl">Grimorio</Link>
    </nav>
  );
}