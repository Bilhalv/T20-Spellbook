import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Filter, Search } from "lucide-react";
import { magiaTipo } from "../data/list magias";
import { MagiaCard } from "./MagiaCard";

interface SearchDataProps {
  magiaLista: magiaTipo[];
}

export default function SearchData(
  props: SearchDataProps
) {
  const complete = [...props.magiaLista]
  const [spells, setSpells] = React.useState<magiaTipo[]>([...complete]);
  return (
    <>
      <div className="flex w-1/2 mx-auto border rounded-2xl p-2 mt-2">
        <IconButton aria-label="filter">
          <Filter />
        </IconButton>
        <InputBase
          placeholder="Search"
          inputProps={{ "aria-label": "search" }}
          fullWidth
          onChange={
            (e) => {
              const value = e.target.value.toLowerCase();
              if (value === "") {
                setSpells(complete);
              } else {
                setSpells(
                  complete.filter((spell) => {
                    return spell.nome.toLowerCase().includes(value) || spell.desc.toLowerCase().includes(value);
                  })
                );
              }
            }
          }
        />
        <IconButton type="submit" aria-label="search">
          <Search />
        </IconButton>
      </div>
      <div className="flex flex-wrap justify-center max-h-80 overflow-y-scroll">
        {spells.map((spell, idx) => (
          <MagiaCard key={idx} magia={spell} />
        ))}
      </div>
    </>
  );
}
