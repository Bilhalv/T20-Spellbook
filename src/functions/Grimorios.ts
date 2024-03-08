import { doc, getDoc, updateDoc, arrayUnion, setDoc, onSnapshot, collection, getFirestore } from "firebase/firestore";
import { magiaTipo } from "../data/list magias";
import { grimorioTipo } from "../pages/Grimorio";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const refGrimorio = collection(getFirestore(), "Grimorio");

export async function addToGrimorio(x: magiaTipo) {
    try {
        const grimorio: grimorioTipo = {
            email: firebase.auth().currentUser?.email || "",
            magias: [x],
        };
        const docRef = doc(refGrimorio, grimorio.email);

        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Se o documento existir, atualize o array de magias
            await updateDoc(docRef, {
                magias: arrayUnion(...grimorio.magias)
            });
        } else {
            // Se o documento não existir, crie um novo
            await setDoc(docRef, grimorio);
        }

        console.log("Document written with ID: ", docRef.id);
        if (docSnap.exists()) {
            const docData = docSnap.data();
            console.log("Current magias: ", (docData.magias as magiaTipo[]));
        }
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
export async function getGrimorio(setGrimorio: (grimorio: grimorioTipo) => void) {
    onSnapshot(refGrimorio, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data() as grimorioTipo;
            if (data.email === firebase.auth().currentUser?.email) {
                setGrimorio(data);
            }
        });
    }
    );
}
export async function removeGrimorio(x: string, grimorio: grimorioTipo | undefined) {
    console.log("Attempting to remove: ", x)
    try {
        const docRef = doc(refGrimorio, grimorio?.email);
        const newmagias = grimorio?.magias.filter((magia) => magia.nome !== x);
        await updateDoc(docRef, {
            magias: newmagias
        });
        console.log("Spell removed with success: ", x)
    } catch (e) {
        console.error("Error removing document: ", e);
    }
}