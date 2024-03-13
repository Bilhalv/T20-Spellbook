import React from "react";
import { Nav } from "../../components/Nav";
import { magiaTipo } from "../../data/list magias";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { MagiaCard } from "../../components/MagiaCard";
import { addSpell } from "../../functions/Spells";
import SearchData from "../../components/SearchData";

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
      addSpell();
    });
  }, []);
  return (
    <>
      <Nav />
      <SearchData />
      <div className="flex flex-col gap-4 mt-4">
        {spells.map((spell, idx) => (
          <MagiaCard
            magia={spell}
            key={idx} />
        ))}
      </div>
    </>
  );
};

export default Home;
