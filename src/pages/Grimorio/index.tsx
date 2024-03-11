import React from "react";
import { Nav } from "../../components/Nav";
import firebase from "./../../../firebase";
import {
  addPersonagem,
  addToGrimorio,
  getGrimorio,
  getPersonagens,
  removeGrimorio,
} from "../../functions/Grimorios";
import { magiaTipo } from "../../data/list magias";
import { getSpells } from "../../functions/Spells";
import { Select } from "@mui/material";
import { collection, getFirestore } from "firebase/firestore";

export interface grimorioTipo {
  email: string;
  magias: magiaTipo[];
  personagem: string;
}

const Grimorio = () => {
  const refGrimorio = collection(getFirestore(), "Grimorio");
  const [spells, setSpells] = React.useState<magiaTipo[]>([]);
  const [personagem, setPersonagem] = React.useState<string>();
  const [grimorio, setGrimorio] = React.useState<grimorioTipo>();
  const [personagens, setPersonagens] = React.useState<string[]>([]);
  const [personagemInput, setPersonagemInput] = React.useState<string>("");
  React.useEffect(() => {
    getSpells(setSpells);
    getPersonagens(setPersonagens);
    getGrimorio(setGrimorio, personagem);
  }, []);

  return (
    <>
      <Nav />
      <div>
        {firebase.auth().currentUser ? (
          <>
            {personagens.length !== 0 && (
              <Select
                fullWidth
                value={personagem}
                onChange={(e) => {
                  setPersonagem(e.target.value);
                  getGrimorio(setGrimorio, e.target.value);
                }}
              >
                {personagens.map((y, i) => (
                  <option key={i} value={y}>
                    {y}
                  </option>
                ))}
              </Select>
            )}
            <input
              type="text"
              onChange={(e) => {
                setPersonagemInput(e.target.value);
              }}
            />
            {personagemInput !== undefined && (
              <button
                onClick={() => {
                  addPersonagem(personagemInput);
                  setPersonagem(personagemInput);
                  getPersonagens(setPersonagens);
                }}
              >
                add to grimorio
              </button>
            )}
            <h1>{firebase.auth().currentUser?.email}</h1>
            {/* <button onClick={() => getSpells(setSpells)}>get spells</button> */}
            {/* <button onClick={addSpell}>add spell</button> */}
            {/* <button onClick={() => getGrimorio(setGrimorio)}>get grimorio</button> */}
            <div>
              <h1>Magias</h1>
              {spells.map((spell, i) => (
                <div key={i}>
                  <h2>{spell.nome}</h2>
                  {personagem !== undefined && (
                    <button onClick={() => addToGrimorio(spell, personagem)}>
                      add to grimorio
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div>
              <h1>Grimorio</h1>
              {grimorio &&
                grimorio.magias.map((spell, i) => (
                  <div key={i}>
                    <h2>{spell.nome}</h2>
                    <button
                      onClick={() => removeGrimorio(spell.nome, grimorio)}
                    >
                      remove
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <h1>no name</h1>
        )}
      </div>
    </>
  );
};

export default Grimorio;
