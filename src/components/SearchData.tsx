import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Filter, Search } from "lucide-react";
import { magiaTipo } from "../data/list magias";
import { MagiaCard } from "./MagiaCard";

interface SearchDataProps {
  magiaLista: magiaTipo[];
}

export default function SearchData(props: SearchDataProps) {
  const complete = [...props.magiaLista];
  const [spells, setSpells] = React.useState<magiaTipo[]>([
    ...props.magiaLista,
  ]);
  const [input, setInput] = React.useState<string>();

  React.useEffect(() => {
    if (spells.length === 0 && !input) {
      setSpells(complete);
    }
  }, [spells, input]);

  function filterSpells() {
    if (input === "") {
      setSpells(complete);
      return;
    }
    const filtered = complete.filter((spell) => {
      return spell.nome.toLowerCase().includes(input as string);
    });
    setSpells(filtered);
  }

  React.useEffect(() => {
    filterSpells();
  }, [input]);
  return (
    <>
      <div className="flex w-1/2 mx-auto border rounded-2xl p-2 mt-2">
        <IconButton aria-label="filter">
          <Filter />
        </IconButton>
        <InputBase
          placeholder={
            complete
              .map((spell) => spell.nome)
              .splice(0, 2)
              .join(", ") + ", ..."
          }
          inputProps={{ "aria-label": "search" }}
          fullWidth
          value={input}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setInput(value);
          }}
        />
        <IconButton type="submit" aria-label="search">
          <Search />
        </IconButton>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {spells.map((spell, idx) => (
          <MagiaCard key={idx} magia={spell} />
        ))}
      </div>
    </>
  );
}
