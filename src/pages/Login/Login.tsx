import React, { useState } from "react";
import firebase from "./../../../firebase";
import { Button, Input } from "@mui/material";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Faça o Login");

  const handleLogin = async () => {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(response);
      setError("Logado com sucesso");
    } catch (error) {
      console.log(error);
      setError("Houve um erro ao logar");
    }
  };
  return (
    <>
      <h2 className="text-center text-xl">Login</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
      <i className="text-xs text-gray-400">Status: {error}</i>
    </>
  );
}
