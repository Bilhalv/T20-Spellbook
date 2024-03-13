import React from "react";
import { Nav } from "../../components/Nav";
import firebase from "./../../../firebase";
import {
  addPersonagem,
  addToGrimorio,
  getGrimorio,
  getGrimoriosDaConta,
  removeGrimorio,
  removeMagiaFromGrimorio,
} from "../../functions/Grimorios";
import { magiaTipo } from "../../data/list magias";
import { getSpells } from "../../functions/Spells";
import { IconButton, Modal, TextField } from "@mui/material";
import { Pen, Plus, Trash2 } from "lucide-react";
import { MagiaCard } from "../../components/MagiaCard";
import { Refresh } from "@mui/icons-material";

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
    getGrimoriosDaConta(setGrimoriosDaConta);
  }, []);
  const [personagem, setPersonagem] = React.useState<string>();
  const [open, setOpen] = React.useState(false);
  const [openAddMagia, setOpenAddMagia] = React.useState(false);

  setTimeout(() => {
    if (personagem === undefined && grimoriosDaConta[0] !== undefined) {
      setPersonagem(grimoriosDaConta[0]?.personagem);
      getGrimorio(setGrimorio, grimoriosDaConta[0]?.personagem);
    }
  }, 100);
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
                  getGrimoriosDaConta(setGrimoriosDaConta);
                }}
              >
                <Pen />
              </IconButton>
            </div>
            {personagem && (
              <>
                <div className="flex w-full justify-between px-6 items-center">
                  <div className="text-xl font-tormenta flex gap-4 items-center">
                    <IconButton
                      onClick={() => {
                        getGrimorio(setGrimorio, personagem);
                      }}
                      sx={{
                        bgcolor: "red",
                        transition: "all 0.5s",
                        "&:hover": {
                          transform: "rotate(360deg)",
                          bgcolor: "rgb(255, 0, 0, 0.5)",
                        },
                      }}
                    >
                      <Refresh />
                    </IconButton>
                    <p>{personagem}</p>
                  </div>
                  <button
                    className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs"
                    onClick={() => {
                      setOpenAddMagia(true);
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {grimorio?.magias.map((spell, i) => (
                    <MagiaCard
                      magia={spell}
                      onDelete={async () => {
                        await removeMagiaFromGrimorio(
                          spell.nome,
                          grimorio
                        ).finally(() => {
                          getGrimorio(setGrimorio, personagem);
                        });
                      }}
                      key={i}
                    />
                  ))}
                </div>
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
                    onClick={async () => {
                      try {
                        await addPersonagem(personagemInput);
                        await setPersonagem(personagemInput);
                        await setOpen(false);
                      } finally {
                        getGrimoriosDaConta(setGrimoriosDaConta);
                      }
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
                          onClick={async () => {
                            try {
                              await setPersonagem(y.personagem);
                            } finally {
                              getGrimorio(setGrimorio, y.personagem);
                              setOpen(false);
                            }
                          }}
                          className="bg-gray-200 p-2 rounded-xl hover:bg-gray-300 transition-all w-1/2 h-fit text-xs"
                        >
                          {y.personagem} - {y.magias.length} magias
                        </button>
                        <button
                          onClick={async () => {
                            try {
                              await removeGrimorio(y.personagem);
                            } finally {
                              getGrimoriosDaConta(setGrimoriosDaConta);
                            }
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
                <div className="bg-white p-4 rounded-xl font-tormenta w-1/2 h-fit text-center overflow-y-scroll overflow-x-hidden flex flex-col items-center gap-4 max-h-60">
                  <h1>Adicionar magia</h1>
                  <div className="flex flex-col w-full">
                    {spells.map((spell, i) => (
                      <div key={i} className="flex justify-between">
                        <h2>{spell.nome}</h2>
                        <button
                          disabled={
                            grimorio?.magias.findIndex(
                              (y) => y.nome === spell.nome
                            ) !== -1
                          }
                          onClick={async () => {
                            try {
                              await addToGrimorio(spell, personagem as string);
                            } finally {
                              getGrimorio(setGrimorio, personagem);
                            }
                          }}
                          className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
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
