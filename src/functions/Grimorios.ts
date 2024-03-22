import {
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  onSnapshot,
  collection,
  getFirestore,
  getDocs,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { magiaTipo } from "../data/list magias";
import { grimorioTipo } from "../pages/Grimorio";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const refGrimorio = collection(getFirestore(), "Grimorio");

export async function addToGrimorio(x: magiaTipo, personagem: string) {
  try {
    var personagemID;

    const querySnapshot = await getDocs(refGrimorio);
    querySnapshot.forEach((doc) => {
      const data = doc.data() as grimorioTipo;
      if (
        data.email === firebase.auth().currentUser?.email &&
        data.personagem === personagem
      ) {
        personagemID = doc.id;
      }
    });

    if (personagemID) {
      const docRef = doc(refGrimorio, personagemID);
      await updateDoc(docRef, {
        magias: arrayUnion(x),
      });

    } else {
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
export async function getPersonagens(
  setPersonagens: (personagens: string[]) => void
) {
  const personagens: string[] = [];
  onSnapshot(refGrimorio, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data() as grimorioTipo;
      if (data.email === firebase.auth().currentUser?.email) {
        personagens.push(data.personagem);
      }
    });
  });
  setPersonagens(personagens);
}
export async function removeMagiaFromGrimorio(
  x: string,
  grimorio: grimorioTipo | undefined
) {
  try {
    //find the grimorio
    const querySnapshot = await getDocs(refGrimorio);
    querySnapshot.forEach((document) => {
      const data = document.data() as grimorioTipo;
      if (
        data.email === firebase.auth().currentUser?.email &&
        data.personagem === grimorio?.personagem
      ) {
        const docRef = doc(refGrimorio, document.id);
        updateDoc(docRef, {
          magias: arrayRemove(
            grimorio?.magias.find((y) => y.nome === x) as magiaTipo
          ),
        });
      }
    });
  } catch (e) {
    console.error("Error removing document: ", e);
  }
}

export async function addPersonagem(personagem: string) {
  try {
    const newPersonagem = {
      email: firebase.auth().currentUser?.email,
      personagem: personagem,
      magias: [],
    };
    const docRef = doc(refGrimorio);
    await setDoc(docRef, newPersonagem as grimorioTipo);
  } catch (e) {
    console.error("Error adding personagem: ", e);
  }
}

export async function getGrimorio(
  setGrimorio: (grimorio: grimorioTipo | undefined) => void,
  personagem: string | undefined
) {
  const querySnapshot = await getDocs(refGrimorio);
  querySnapshot.forEach((doc) => {
    const data = doc.data() as grimorioTipo;
    if (
      data.email === firebase.auth().currentUser?.email &&
      data.personagem === personagem
    ) {
      setGrimorio(data);
    }
  });
}

export async function getGrimoriosDaConta(
  setGrimoriosDaConta: (grimorios: grimorioTipo[]) => void
) {
  const querySnapshot = await getDocs(refGrimorio);
  const grimoriostemp: grimorioTipo[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data() as grimorioTipo;
    if (data.email === firebase.auth().currentUser?.email) {
      grimoriostemp.push(data);
    }
  });
  setGrimoriosDaConta(grimoriostemp);
}

export async function removeGrimorio(personagem: string) {
  const querySnapshot = await getDocs(refGrimorio);
  querySnapshot.forEach(async (document) => {
    const data = document.data() as grimorioTipo;
    if (
      data.email === firebase.auth().currentUser?.email &&
      data.personagem === personagem
    ) {
      const docRef = doc(refGrimorio, document.id);
      await deleteDoc(docRef);
    }
  });
}