import firebase from "../../firebase";
import React from "react";
import { Link } from "react-router-dom";
import { AvatarPopover } from "./AvatarPopover";

export function Nav() {
  const [janela, setJanela] = React.useState(window.location.pathname);
  React.useEffect(() => {
    setJanela(window.location.pathname);
  }, [window.location.pathname]);
  return (
    <nav className="from-transparent bg-gradient-to-t to-black p-4 text-white flex justify-between h-20 mb-4">
      <div className="text-xl w-full flex">
        <Link
          to="/"
          className={
            "transition-all " +
            (janela === "/"
              ? "border-b border-b-white w-fit"
              : "border-b border-b-transparent hover:border-b-white/30")
          }
        >
          Home
        </Link>
      </div>
      {firebase.auth().currentUser ? (
        <>
          <div className="text-xl w-full flex justify-center">
            <Link
              to="/grimorio"
              className={
                "transition-all " +
                (janela === "/grimorio"
                  ? "border-b border-b-white w-fit mx-auto"
                  : "border-b border-b-transparent hover:border-b-white/30")
              }
            >
              Grimorio
            </Link>
          </div>
          <div className="w-full">
            <div className="flex justify-end">
              <AvatarPopover />
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-end h-fit">
          <Link to="/login" className="text-xl w-full">
            <button className="bg-white hover:bg-black hover:text-white text-black py-2 px-4 rounded transition-all text-sm">
              <p
                className={
                  janela === "/login" ? "border-b border-b-white w-fit" : ""
                }
              >
                Login
              </p>
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
