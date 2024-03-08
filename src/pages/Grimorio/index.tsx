import React from "react";
import { Nav } from "../../components/Nav";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { Firestore } from "@google-cloud/firestore";
import { onSnapshot } from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";
import firebase from "./../../../firebase";

interface magiaTipo {
  alcance: string;
  alvo: string;
  aprimoramentos: [
    {
      pm: string;
      desc: string;
    }
  ];
  circulo: number;
  desc: string;
  duracao: string;
  escola: string;
  execucao: string;
  nome: string;
  resistencia: string;
  tipo: string;
}
interface grimorioTipo {
  email: string;
  magias: magiaTipo[];
}

const Grimorio = () => {
  const [spells, setSpells] = React.useState<magiaTipo[]>([]);
  const [grimorio, setGrimorio] = React.useState<grimorioTipo>();

  const refMagia = collection(getFirestore(), "Magias");
  const refGrimorio = collection(getFirestore(), "Grimorio");

  async function getSpells() {
    onSnapshot(refMagia, (querySnapshot) => {
      const items: magiaTipo[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as magiaTipo);
      });
      setSpells(items);
    });
  }

  async function addSpell() {
    try {
      const magia: magiaTipo = {
        alcance: "toque",
        alvo: "criatura",
        aprimoramentos: [
          {
            pm: "1",
            desc: "aumenta o dano em 1d6",
          },
        ],
        circulo: 1,
        desc: "uma bola de fogo",
        duracao: "instantaneo",
        escola: "evocacao",
        execucao: "1 acao",
        nome: "bola de fogo",
        resistencia: "reflexos",
        tipo: "dano",
      };
      const docRef = doc(refMagia, magia.nome);
      await setDoc(docRef, magia);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function addToGrimorio(x: magiaTipo) {
    try {
      const grimorio: grimorioTipo = {
        email: firebase.auth().currentUser?.email || "",
        magias: [x],
      };
      const docRef = doc(refGrimorio, grimorio.email);
      await setDoc(docRef, grimorio);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async function getGrimorio() {
    onSnapshot(refGrimorio, (querySnapshot) => {
      const items: magiaTipo[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as magiaTipo);
      });
      setGrimorio({
        email: firebase.auth().currentUser?.email || "",
        magias: items,
      });
    });
  }
  async function removeGrimorio(x: string) {
    try {
      const docRef = doc(getFirestore(), "Grimorio", x);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }
  return (
    <>
      <Nav />
      <div>
        <h1>
          here is where ill put the spells sorted by character, with its own
          screen, prolly in a select to change wich character is shown
        </h1>
        {firebase.auth().currentUser ? (
          <>
            <h1>{firebase.auth().currentUser?.email}</h1>
            <button onClick={getSpells}>get spells</button>
            <button onClick={addSpell}>add spell</button>
            <button onClick={getGrimorio}>get grimorio</button>
            <div>
              <h1>Magias</h1>
              {spells.map((spell, i) => (
                <div key={i}>
                  <h2>{spell.nome}</h2>
                  <button onClick={() => addToGrimorio(spell)}>
                    add to grimorio
                  </button>
                </div>
              ))}
            </div>
            <div>
              <h1>Grimorio</h1>
              {grimorio &&
                grimorio.magias.map((spell, i) => (
                  <div key={i}>
                    <h2>{spell.nome}</h2>
                    <button onClick={() => removeGrimorio(spell.nome)}>
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
