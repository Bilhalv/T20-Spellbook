import React from "react";
import { Nav } from "../../components/Nav";
import firebase from "./../../../firebase";
import {
  addPersonagem,
  addToGrimorio,
  getGrimorio,
  getGrimoriosDaConta,
  getPersonagens,
  removeGrimorio,
  removeMagiaFromGrimorio,
} from "../../functions/Grimorios";
import { magiaTipo } from "../../data/list magias";
import { getSpells } from "../../functions/Spells";
import {
  IconButton,
  Input,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Pen, Plus, Trash2 } from "lucide-react";

export interface grimorioTipo {
  email: string;
  magias: magiaTipo[];
  personagem: string;
}

const Grimorio = () => {
  const [grimoriosDaConta, setGrimoriosDaConta] = React.useState<
    grimorioTipo[]
  >([]);
  const [spells, setSpells] = React.useState<magiaTipo[]>([]);
  const [grimorio, setGrimorio] = React.useState<grimorioTipo>();
  const [personagemInput, setPersonagemInput] = React.useState<string>("");
  React.useEffect(() => {
    getSpells(setSpells);
    getGrimorio(setGrimorio, personagem);
    getGrimoriosDaConta(setGrimoriosDaConta, grimoriosDaConta);
  }, []);
  const [personagem, setPersonagem] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const [openAddMagia, setOpenAddMagia] = React.useState(false);
  return (
    <>
      <Nav />
      <div>
        {firebase.auth().currentUser ? (
          <>
            <div className="flex justify-between items-center px-10">
              <h1>
                Grimório selecionado: {personagem ? personagem : "Nenhum"}
              </h1>
              <IconButton
                onClick={() => {
                  setOpen(true);
                }}
              >
                <Pen />
              </IconButton>
            </div>
            {personagem && (
              <>
                <div className="flex w-full justify-between px-6 items-center">
                  <h1 className="text-xl">{personagem}</h1>
                  <button
                    className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs"
                    onClick={() => {
                      setOpenAddMagia(true);
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {grimorio?.magias.map((spell, i) => (
                  <div key={i} className="flex justify-between">
                    <h2>{spell.nome}</h2>
                    <button
                      onClick={() => {
                        removeMagiaFromGrimorio(spell.nome, grimorio);
                        setTimeout(() => {
                          getGrimorio(setGrimorio, personagem);
                        }, 1000);
                      }}
                      className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </>
            )}
            <Modal
              open={open}
              onClose={() => setOpen(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <div className="bg-white p-4 rounded-xl font-tormenta w-1/2 h-fit text-center">
                <h1>Mudar Grimório</h1>
                <div className="flex justify-between items-center">
                  <TextField
                    type="text"
                    onChange={(e) => {
                      setPersonagemInput(e.target.value);
                    }}
                    variant="outlined"
                    fullWidth
                    label="Adicionar Grimório"
                    size="small"
                  />
                  <button
                    onClick={() => {
                      addPersonagem(personagemInput);
                      setPersonagem(personagemInput);
                      setOpen(false);
                    }}
                    disabled={
                      personagemInput === "" ||
                      personagemInput === undefined ||
                      personagemInput.split("").length < 3 ||
                      personagemInput.split("").length > 10
                    }
                    className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                {grimoriosDaConta.length !== 0 && (
                  <div className="overflow-y-scroll overflow-x-hidden flex gap-4 max-h-60 flex-col items-center">
                    {grimoriosDaConta.map((y, i) => (
                      <div className="w-full flex justify-between">
                        <button
                          key={i}
                          onClick={() => {
                            setPersonagem(y.personagem);
                            getGrimorio(setGrimorio, y.personagem);
                            setOpen(false);
                          }}
                          className="bg-gray-200 p-2 rounded-xl hover:bg-gray-300 transition-all w-1/2 h-fit text-xs"
                        >
                          {y.personagem} - {y.magias.length} magias
                        </button>
                        <button
                          onClick={() => {
                            removeGrimorio(y.personagem);
                            setTimeout(() => {
                              getGrimoriosDaConta(setGrimoriosDaConta, []);
                            }, 1000);
                          }}
                          className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Modal>
            <Modal
              open={openAddMagia}
              onClose={() => setOpenAddMagia(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
              }}
            >
              <>
                <div>
                  <h1>Adicionar magia</h1>
                  <div>
                    {spells.map((spell, i) => (
                      <div key={i} className="flex justify-between">
                        <h2>{spell.nome}</h2>
                        <button
                          disabled={
                            !personagem ||
                            grimorio?.magias.findIndex(
                              (y) => y.nome === spell.nome
                            ) !== -1
                          }
                          onClick={() => {
                            addToGrimorio(spell, personagem as string);
                            setTimeout(() => {
                              getGrimorio(setGrimorio, personagem);
                            }, 1000);
                          }}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            </Modal>
          </>
        ) : (
          <h1>no name</h1>
        )}
      </div>
    </>
  );
};

export default Grimorio;
