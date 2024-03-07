import React, { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
declare const firebase: any;
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("Faça o Login");
  const [showPassword, setShowPassword] = React.useState(false);

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
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="email">Email</InputLabel>
        <OutlinedInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="senha">Senha</InputLabel>
        <OutlinedInput
          onChange={(e) => setPassword(e.target.value)}
          id="senha"
          type={showPassword ? "text" : "password"}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Senha"
        />
      </FormControl>
      <Button variant="outlined" onClick={handleLogin}>
        Login
      </Button>
      <i className="text-xs text-gray-400">Status: {error}</i>
    </>
  );
}
