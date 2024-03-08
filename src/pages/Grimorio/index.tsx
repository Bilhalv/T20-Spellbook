import React from "react";
import { Nav } from "../../components/Nav";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { Firestore } from "@google-cloud/firestore";
import { onSnapshot } from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";
import firebase from "./../../../firebase";
import { addToGrimorio, getGrimorio, removeGrimorio } from "../../functions/Grimorios";
import { magiaTipo } from "../../data/list magias";
import { addSpell, getSpells } from "../../functions/Spells";

export interface grimorioTipo {
  email: string;
  magias: magiaTipo[];
}

const Grimorio = () => {
  const [spells, setSpells] = React.useState<magiaTipo[]>([]);
  const [grimorio, setGrimorio] = React.useState<grimorioTipo>();

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
            <button onClick={() => getSpells(setSpells)}>get spells</button>
            <button onClick={addSpell}>add spell</button>
            <button onClick={() => getGrimorio(setGrimorio)}>get grimorio</button>
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
                    <button onClick={() => removeGrimorio(spell.nome, grimorio)}>
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
