import { collection, getFirestore, onSnapshot, doc, setDoc } from "firebase/firestore";
import { magiaTipo, magiasListTEMPORARIA } from "../data/list magias";

const refMagia = collection(getFirestore(), "Magias");

export async function getSpells(setSpells: (spells: magiaTipo[]) => void) {
    onSnapshot(refMagia, (querySnapshot) => {
        const items: magiaTipo[] = [];
        querySnapshot.forEach((doc) => {
            items.push(doc.data() as magiaTipo);
        });
        setSpells(items);
        addSpell(); // remove this when all the spells are added
    });
}

export async function addSpell() {
    try {
        magiasListTEMPORARIA.forEach(async (magia) => {
            const docRef = doc(refMagia, magia.nome);
            await setDoc(docRef, magia);
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}