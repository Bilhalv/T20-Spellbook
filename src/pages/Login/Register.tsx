import React, { useState } from "react";
import firebase from "./../../../firebase";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";

export function Register() {
  const [email, setEmail] = useState("");
  const [confirmarEmail, setConfirmarEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("Faça o Registro");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleRegister = async () => {
    if (email !== confirmarEmail) {
      setError("Os emails não são iguais");
      return;
    }
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
  };
  const errorSpan = (text: string) => (
    <span className="text-red-600">{text}</span>
  );
  const successSpan = (text: string) => (
    <span className="text-green-600">{text}</span>
  );
  return (
    <>
      <h2 className="text-center text-xl">Registrar-se</h2>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="email">Email</InputLabel>
        <OutlinedInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
        />
        <FormHelperText id="email">
          {!email && "Digite um email"}
          {email && !email.includes("@") && errorSpan("Email inválido")}
          {email && email.includes("@") && successSpan("Email válido")}
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="confirmarEmail">Confirmar Email</InputLabel>
        <OutlinedInput
          disabled={email === ""}
          type="email"
          value={confirmarEmail}
          label="Confirmar Email"
          onChange={(e) => setConfirmarEmail(e.target.value)}
        />
        <FormHelperText id="confirmarEmail">
          {email &&
            confirmarEmail &&
            email !== confirmarEmail &&
            errorSpan("Os emails não são iguais")}
          {email &&
            email === confirmarEmail &&
            successSpan("Os emails são iguais")}
          {email && !confirmarEmail && "Digite o email novamente"}
        </FormHelperText>
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
        <FormHelperText id="senha">
          <>
            {password &&
              password.length < 6 &&
              errorSpan("Senha muito curta(mínimo 6)")}
            {password && password.length >= 6 && successSpan("Senha válida")}
            {!password && "Digite uma senha"}
          </>
        </FormHelperText>
      </FormControl>
      <FormControl sx={{ m: 1 }}>
        <InputLabel id="confirmarSenha">Confirmar Senha</InputLabel>
        <OutlinedInput
          disabled={password === ""}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          id="confirmarSenha"
          type="password"
          value={passwordConfirm}
          label="Confirmar Senha"
          endAdornment={
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
        <FormHelperText id="confirmarSenha">
          <>
            {passwordConfirm &&
              password !== passwordConfirm &&
              errorSpan("Senhas não batem")}
            {passwordConfirm &&
              password === passwordConfirm &&
              successSpan("Senhas batem")}
            {password && !passwordConfirm && "Digite a senha novamente"}
          </>
        </FormHelperText>
      </FormControl>
      <Button variant="outlined" onClick={handleRegister}>
        Registrar-se
      </Button>
      <i className="text-xs text-gray-400">Status: {error}</i>
    </>
  );
}
