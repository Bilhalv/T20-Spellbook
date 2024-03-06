import React, { useState } from "react";
import firebase from "./../../../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Faça o login");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
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

  const handleRegister = async () => {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(response);
      setError("Registrado com sucesso");
    } catch (error) {
      console.log(error);
      setError("Houve um erro ao registrar");
    }
  }

  return (
    <>
      <div>
        <h1>here is where ill put the login form and the register form</h1>
        {isCreatingNew ? (
          <>
            <h2>Register</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
          </>
        ) : (
          <>
            <h2>Login</h2>
            <p>{error}</p>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
          </>
        )}
        <button onClick={() => setIsCreatingNew(!isCreatingNew)}>
          {isCreatingNew ? "Já tenho conta" : "Criar conta"}
        </button>
      </div>
    </>
  );
};

export default Login;
