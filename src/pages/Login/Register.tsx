import React, { useState } from "react";
import firebase from "./../../../firebase";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
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
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const handleRegister = async () => {
    if (email !== confirmarEmail) {
      setError("Os emails não são iguais");
      return;
    }
    if (password !== passwordConfirm) {
      setError("As senhas não são iguais");
      return;
    }
    if (password.length < 6) {
      setError("A senha é muito curta");
      return;
    }
    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log(response);
      setError("Registrado com sucesso");
      window.location.href = "/grimorio";
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
          type={showPassword1 ? "text" : "password"}
          value={password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword1(!showPassword1)}
                onMouseDown={(e) => e.preventDefault()}
                edge="end"
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
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
          type={showPassword2 ? "text" : "password"}
          value={passwordConfirm}
          label="Confirmar Senha"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleRegister();
            }
          }}
          endAdornment={
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword2(!showPassword2)}
              onMouseDown={(e) => e.preventDefault()}
              edge="end"
            >
              {showPassword2 ? <VisibilityOff /> : <Visibility />}
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
