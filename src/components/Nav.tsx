import { Avatar, Popover } from "@mui/material";
import firebase from "../../firebase";
import React from "react";
import { Link } from "react-router-dom";
import { AvatarPopover } from "./AvatarPopover";

export function Nav() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <Link to="/" className="text-xl">
        Home
      </Link>
      {firebase.auth().currentUser ? (
        <>
          <Link to="/grimorio" className="text-xl">
            Grimorio
          </Link>
          <AvatarPopover />
        </>
      ) : (
        <Link to="/login" className="text-xl">
          <button className="bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded transition-all text-sm">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
}
