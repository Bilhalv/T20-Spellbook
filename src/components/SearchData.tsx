import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Filter, Search } from "lucide-react";

export default function SearchData() {
  return (
    <div className="flex w-1/2 mx-auto border rounded-2xl p-2 mt-2">
      <IconButton aria-label="filter">
        <Filter />
      </IconButton>
      <InputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        fullWidth
      />
      <IconButton type="submit" aria-label="search">
        <Search />
      </IconButton>
    </div>
  );
}
