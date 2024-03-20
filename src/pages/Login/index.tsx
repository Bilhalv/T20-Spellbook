import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { Button } from "@mui/material";
import { Nav } from "../../components/Nav";

const Entrar = () => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  return (
    <>
      <body className="bg-bg-t20 min-h-screen">
        <Nav />
        <div className="flex flex-col desktop:w-2/3 w-4/5 mx-auto mt-4 bg-white/90 p-5 rounded-xl">
          {isCreatingNew ? <Register /> : <Login />}
          <Button onClick={() => setIsCreatingNew(!isCreatingNew)}>
            {isCreatingNew ? "Já tenho conta" : "Criar conta"}
          </Button>
        </div>
      </body>
    </>
  );
};

export default Entrar;
