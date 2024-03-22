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
import {
  IconButton,
  Modal,
  Popover,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { Pen, Plus, Trash2 } from "lucide-react";
import { Refresh } from "@mui/icons-material";
import SearchData from "../../components/SearchData";
import { TabContext, TabList, TabPanel } from "@mui/lab";

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
  function update() {
    getSpells(setSpells);
    getGrimorio(setGrimorio, personagem);
    getGrimoriosDaConta(setGrimoriosDaConta);
  }
  React.useEffect(() => {
    update();
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

  const [popovers, setPopovers] = React.useState<boolean[]>([
    false,
    false,
    false,
  ]);

  const [tabs, setTabs] = React.useState<string>("Add");

  function AtualizarArray() {
    getGrimorio(setGrimorio, personagem);
    console.log("Atualizado", personagem, grimorio);
  }
  return (
    <>
      <body className="bg-bg-t20 min-h-screen">
        <Nav />
        <div className="bg-white/90 desktop:w-5/6 mx-2 desktop:mx-auto rounded-xl p-4">
          {firebase.auth().currentUser ? (
            <>
              <div className="flex flex-col gap-4">
                <p className="text-center font-tormenta text-2xl">
                  {personagem}
                </p>
                <div className="flex w-full justify-between px-6 items-center">
                  <div className="flex flex-col items-center">
                    <IconButton
                      aria-describedby="refresh"
                      id="refresh"
                      aria-haspopup="true"
                      disabled={personagem === undefined}
                      onMouseEnter={() => {
                        setPopovers([true, ...popovers.slice(1)]);
                      }}
                      onMouseLeave={() => {
                        setPopovers([false, ...popovers.slice(1)]);
                      }}
                      onClick={() => {
                        AtualizarArray();
                      }}
                      sx={{
                        bgcolor: "transparent",
                        transition: "all 0.5s",
                        "&:hover": {
                          transform: "rotate(360deg)",
                          bgcolor: "rgb(255, 0, 0, 0.5)",
                        },
                      }}
                    >
                      <Refresh />
                    </IconButton>
                    <Popover
                      id="refresh"
                      anchorEl={document.getElementById("refresh") as Element}
                      open={popovers[0]}
                      onClose={() => {
                        setPopovers([false, ...popovers.slice(1)]);
                      }}
                      disableRestoreFocus
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      sx={{
                        pointerEvents: "none",
                        "& .MuiPopover-paper": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <div className="p-1 rounded-xl bg-red-600/75 font-poppins italic text-white px-4">
                        Refresh
                      </div>
                    </Popover>
                  </div>
                  <div className="flex gap-4 items-center">
                    <IconButton
                      aria-describedby="remove"
                      id="remove"
                      aria-haspopup="true"
                      onMouseEnter={() => {
                        setPopovers([popovers[0], true, popovers[2]]);
                      }}
                      onMouseLeave={() => {
                        setPopovers([popovers[0], false, popovers[2]]);
                      }}
                      onClick={() => {
                        setOpen(true);
                      }}
                      sx={{
                        bgcolor: "transparent",
                        transition: "all 0.5s",
                        "&:hover": {
                          bgcolor: "rgb(255, 0, 0, 0.5)",
                        },
                      }}
                    >
                      <Pen />
                    </IconButton>
                    <Popover
                      id="remove"
                      anchorEl={document.getElementById("remove") as Element}
                      open={popovers[1]}
                      onClose={() => {
                        setPopovers([popovers[0], false, popovers[2]]);
                      }}
                      disableRestoreFocus
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      sx={{
                        pointerEvents: "none",
                        "& .MuiPopover-paper": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <div className="p-1 rounded-xl bg-red-600/75 font-poppins italic text-white px-4">
                        Mudar
                      </div>
                    </Popover>
                  </div>
                  <div className="flex gap-4 items-center">
                    <IconButton
                      disabled={personagem === undefined}
                      sx={{
                        bgcolor: "transparent",
                        transition: "all 0.5s",
                        "&:hover": {
                          bgcolor: "rgb(255, 0, 0, 0.5)",
                        },
                      }}
                      onClick={() => {
                        setOpenAddMagia(true);
                      }}
                      onMouseEnter={() => {
                        setPopovers([popovers[0], popovers[1], true]);
                      }}
                      onMouseLeave={() => {
                        setPopovers([popovers[0], popovers[1], false]);
                      }}
                      id="add"
                    >
                      <Plus size={20} />
                    </IconButton>
                    <Popover
                      id="add"
                      anchorEl={document.getElementById("add") as Element}
                      open={popovers[2]}
                      onClose={() => {
                        setPopovers([popovers[0], popovers[1], false]);
                      }}
                      disableRestoreFocus
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                      sx={{
                        pointerEvents: "none",
                        "& .MuiPopover-paper": {
                          backgroundColor: "transparent",
                          boxShadow: "none",
                        },
                      }}
                    >
                      <div className="p-1 px-4 rounded-xl bg-red-600/75 font-poppins italic text-white">
                        Adicionar
                      </div>
                    </Popover>
                  </div>
                </div>
                <div>
                  {grimorio && <SearchData magiaLista={grimorio.magias} />}
                </div>
              </div>
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
                  <div className="bg-white p-4 rounded-xl font-tormenta w-1/2 h-fit text-center overflow-x-hidden flex flex-col items-center gap-4">
                    <div className="w-full">
                      <TabContext value={tabs}>
                        <div>
                          <TabList
                            onChange={(_, x) => {
                              setTabs(x);
                            }}
                            aria-label="lab API tabs example"
                            variant="fullWidth"
                          >
                            <Tab label="Adicionar Magia" value="1" />
                            <Tab label="Editar Grimório" value="2" />
                          </TabList>
                        </div>
                        <TabPanel value="1">
                          <div className="flex flex-col w-full overflow-y-scroll max-h-60 my-auto">
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
                                      await addToGrimorio(
                                        spell,
                                        personagem as string
                                      );
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
                        </TabPanel>
                        <TabPanel value="2">
                          <div className="flex flex-col w-full overflow-y-scroll max-h-60 my-auto">
                            {grimorio?.magias.map((spell, i) => (
                              <div key={i} className="flex justify-between">
                                <h2>{spell.nome}</h2>
                                <button
                                  onClick={async () => {
                                    try {
                                      await removeMagiaFromGrimorio(
                                        spell.nome,
                                        grimorio
                                      );
                                    } finally {
                                      getGrimorio(setGrimorio, personagem);
                                    }
                                  }}
                                  className="bg-gray-200 p-2 rounded-full m-2 hover:bg-gray-300 transition-all text-xs"
                                >
                                  <Trash2 size={20} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </TabPanel>
                      </TabContext>
                    </div>
                  </div>
                </>
              </Modal>
            </>
          ) : (
            <h1>no name</h1>
          )}
        </div>
      </body>
    </>
  );
};

export default Grimorio;
