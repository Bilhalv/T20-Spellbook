import React from "react";
import { Nav } from "../../components/Nav";
import { magiaTipo } from "../../data/list magias";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { addSpell } from "../../functions/Spells";
import SearchData from "../../components/SearchData";

const Home = () => {
  const refMagia = collection(getFirestore(), "Magias");
  const [spells, setSpells] = React.useState<magiaTipo[]>([]);

  React.useEffect(() => {
      addSpell(); // remove this line when database coplete
    onSnapshot(refMagia, (querySnapshot) => {
      const items: magiaTipo[] = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data() as magiaTipo);
      });
      setSpells(items);
    });
  }, []);
  return (
    <>
      <Nav />
      <SearchData
        magiaLista={spells}
      />
    </>
  );
};

export default Home;
