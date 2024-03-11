import { Avatar, IconButton, Modal, Popover } from "@mui/material";
import firebase from "../../firebase";
import React from "react";
import { Pen } from "lucide-react";

function ButtonConstructor(content: string, onClick: () => void) {
  return (
    <button
      onClick={onClick}
      className="border-r-2 border-transparent hover:border-r-white text-left font-bold py-2 transition-all"
    >
      {content}
    </button>
  );
}

export function AvatarPopover() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const onLogout = () => {
    const confirm = window.confirm("Deseja sair?");
    if (!confirm) return;
    firebase.auth().signOut();
    window.location.href = "/";
  };
  const [optionEditing, setOptionEditing] = React.useState<
    null | "Email" | "Nome" | "Foto de perfil"
  >(null);
  const onEditProfile = (option: "Email" | "Nome" | "Foto de perfil") => {
    console.log("Editing: ", option);
    setOptionEditing(option);
    switch (option) {
      case "Email":
        firebase
          .auth()
          .currentUser?.updateEmail(window.prompt("Digite o novo email") || "");
        break;
      case "Nome":
        firebase.auth().currentUser?.updateProfile({
          displayName: window.prompt("Digite o novo nome") || "",
        });
        break;
      case "Foto de perfil":
        var input = document.createElement("input");
        input.type = "file";
        input.click();
        input.onchange = () => {
          firebase.auth().currentUser?.updateProfile({
            photoURL: input.value,
          });
          console.log("PhotoURL: ", input.value);
        };
        break;
    }
  };
  return (
    <>
      <button
        aria-describedby={Boolean(anchorEl) ? "simple-popover" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <Avatar src={firebase.auth().currentUser?.photoURL || ""} />
      </button>
      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        sx={{
          "& .MuiPopover-paper": {
            padding: "1rem",
            bgcolor: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "0.5rem",
            backdropFilter: "blur(10px)",
          },
        }}
      >
        <div className="flex flex-col w-32 text-sm">
          {ButtonConstructor("Logout", onLogout)}
          {ButtonConstructor("Perfil", () => {
            setIsProfileOpen(true);
          })}
        </div>
      </Popover>
      <Modal
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="h-96 w-1/2 bg-white/75 absolute p-4 rounded-xl flex flex-col justify-center items-center gap-4">
          <Avatar
            sx={{ cursor: "pointer", width: 100, height: 100 }}
            onClick={() => onEditProfile("Foto de perfil")}
            src={firebase.auth().currentUser?.photoURL || ""}
          />
          <p>{firebase.auth().currentUser?.photoURL || "aaa"}</p>
          <p
            className="hover:cursor-pointer"
            onClick={() => onEditProfile("Email")}
          >
            {firebase.auth().currentUser?.email}
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() => onEditProfile("Nome")}
          >
            {firebase.auth().currentUser?.displayName || "Sem nome"}
          </p>
        </div>
      </Modal>
    </>
  );
}
