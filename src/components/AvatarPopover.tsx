import { Avatar, Modal, Popover } from "@mui/material";
import firebase from "../../firebase";
import React from "react";
import { Pen, LogOut } from "lucide-react";
import "firebase/storage";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

function ButtonConstructor(
  content: string,
  onClick: () => void,
  icon: React.JSX.Element
) {
  return (
    <button
      onClick={onClick}
      className="border-r-2 border-transparent hover:border-r-white text-left font-bold p-2 transition-all flex justify-between items-center hover:cursor-pointer"
    >
      <p>{content}</p>
      {icon}
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

  const [profileInfo, setProfileInfo] = React.useState({
    email: "",
    name: "",
    photoURL: "",
  });

  const onEditProfile = (option: "Nome" | "Foto de perfil") => {
    console.log("Editing: ", option);
    switch (option) {
      case "Nome":
        const name = window.prompt("Digite o novo nome") || "";
        firebase.auth().currentUser?.updateProfile({
          displayName: name,
        });
        break;
      case "Foto de perfil":
        const UID = firebase.auth().currentUser?.uid;
        var input = document.createElement("input");
        input.type = "file";
        input.click();
        input.onchange = () => {
          const storage = getStorage();
          const storageRef = ref(storage, `users/${UID}/profile.jpg`);
          const file = input.files?.item(0);
          if (file) {
            const uploadTask = uploadBytes(storageRef, file);
            uploadTask.then((snapshot) => {
              getDownloadURL(snapshot.ref).then((url) => {
                firebase.auth().currentUser?.updateProfile({
                  photoURL: url,
                });
              });
            });
          }
        };
        break;
    }
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setProfileInfo({
          email: user.email || "",
          name: user.displayName || "",
          photoURL: user.photoURL || "",
        });
      }
    });
  }, []);
  return (
    <>
      <button
        aria-describedby={Boolean(anchorEl) ? "simple-popover" : undefined}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        className="flex gap-4"
      >
        <div className="flex flex-col text-left">
          <p>{profileInfo.name}</p>
          <p className="italic text-xs">{profileInfo.email}</p>
        </div>
        <Avatar sx={{ border: "2px solid white" }} src={profileInfo.photoURL} />
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
          {ButtonConstructor(
            "Perfil",
            () => {
              setIsProfileOpen(true);
            },
            <Pen size={20} />
          )}
          {ButtonConstructor("Logout", onLogout, <LogOut size={20} />)}
        </div>
      </Popover>
      <Modal
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className="h-96 w-1/2 bg-white/75 absolute p-4 rounded-xl flex flex-col justify-center items-center gap-4">
          <Avatar
            sx={{
              cursor: "pointer",
              width: 100,
              height: 100,
              border: "2px solid white",
            }}
            onClick={() => onEditProfile("Foto de perfil")}
            src={profileInfo.photoURL}
          />
          <p className="hover:cursor-not-allowed">
            {profileInfo.email || "Sem email"}
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() => onEditProfile("Nome")}
          >
            {profileInfo.name || "Sem nome"}
          </p>
        </div>
      </Modal>
    </>
  );
}
