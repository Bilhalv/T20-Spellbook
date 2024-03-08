import React from "react";
import { Nav } from "../../components/Nav";
import { magiaTipo } from "../../data/list magias";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";

const Home = () => {
  const refMagia = collection(getFirestore(), "Magias");
  const [spells, setSpells] = React.useState<magiaTipo[]>([]);

  React.useEffect(() => {
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
      <div>
        <h1>here is where ill put the spells just to browse</h1>
        <ul>
          {spells.map((spell, idx) => (
            <li key={idx}>{spell.nome}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
