import React, { useState } from "react";
import { Register } from "./Register";
import { Login } from "./Login";
import { Button } from "@mui/material";
import { Nav } from "../../components/Nav";

const Entrar = () => {
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  return (
    <>
      <Nav />
      <div className="flex flex-col w-1/2 mx-auto mt-4">
        {isCreatingNew ? <Register /> : <Login />}
        <Button onClick={() => setIsCreatingNew(!isCreatingNew)}>
          {isCreatingNew ? "Já tenho conta" : "Criar conta"}
        </Button>
      </div>
    </>
  );
};

export default Entrar;
