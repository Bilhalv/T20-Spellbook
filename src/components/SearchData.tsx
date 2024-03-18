import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Bomb, Filter, FilterX, Search } from "lucide-react";
import { magiaTipo } from "../data/list magias";
import { MagiaCard } from "./MagiaCard";
import {
  Badge,
  Button,
  ButtonGroup,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  TextField,
} from "@mui/material";

type filtro = {
  tipo: string; //TODO limitar opções
  content: any[]; //TODO limitar opções
};

interface SearchDataProps {
  magiaLista: magiaTipo[];
}

function InputComponent({
  setContentInput,
  contentInput,
  label,
  type,
}: {
  setContentInput: (value: string) => void;
  contentInput: string;
  label: string;
  type?: string;
}) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <OutlinedInput
        id={label}
        size="small"
        label={label}
        type={type ? type : "text"}
        value={contentInput}
        onChange={(e) => {
          setContentInput(e.target.value);
        }}
      />
    </FormControl>
  );
}

function SelectComponent({
  setContentSelect,
  contentSelect,
  label,
  options,
}: {
  setContentSelect: (value: string) => void;
  contentSelect: string;
  label: string;
  options: string[];
}) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        id={label}
        size="small"
        label={label}
        value={contentSelect}
        onChange={(e) => {
          setContentSelect(e.target.value);
        }}
      >
        <MenuItem value=""> </MenuItem>
        {options.map((option, idx) => (
          <MenuItem key={idx} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
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
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setFilterOpen(!filterOpen);
  };
  const [filters, setFilters] = React.useState<filtro[]>([]);

  function findFilter(e: string, tipo: string) {
    if (!e) {
      let oldFilters = [...filters];
      oldFilters.splice(
        oldFilters.findIndex((filter) => filter.tipo === tipo),
        1
      );
      setFilters(oldFilters);
      return;
    }
    let oldFilters = [...filters];
    const foundFilter = oldFilters.find((filter) => filter.tipo === tipo);
    if (foundFilter) {
      foundFilter.content[0] = e;
    } else {
      oldFilters.push({ tipo: tipo, content: [e] });
    }
    setFilters(oldFilters);
  }
  return (
    <>
      <div className="flex w-1/2 mx-auto border rounded-2xl p-2 mt-2">
        <Badge badgeContent={filters.length} color="error">
          <IconButton
            aria-label="filter"
            aria-describedby={"filter"}
            onClick={handleClick}
          >
            <Filter />
          </IconButton>
        </Badge>
        <Popover
          id={"filter"}
          open={filterOpen}
          anchorEl={anchorEl}
          onClose={() => setFilterOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            "& .MuiPopover-paper": {
              padding: 2,
              borderRadius: 5,
              backgroundColor: "rgba(255,255,255,0.9)",
            },
          }}
        >
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <SelectComponent
              contentSelect={
                filters.find((filter) => filter.tipo === "Classificação")
                  ?.content[0]
              }
              setContentSelect={(e) => {
                findFilter(e, "Classificação");
              }}
              label="Classificação"
              options={["Arcana", "Divina"]}
            />
            <InputComponent
              contentInput={
                filters.find((filter) => filter.tipo === "Círulo")?.content[0]
              }
              setContentInput={(e) => {
                findFilter(e, "Círulo");
              }}
              label="Círulo"
              type="number"
            />
            <ButtonGroup fullWidth>
              <Button
                onClick={() => {
                  setFilters([]);
                  setFilterOpen(false);
                }}
                color="error"
              >
                <FilterX />
              </Button>
              <Button color="success">
                <Filter />
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Popover>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              filterSpells();
            }
          }}
        />
        <IconButton
          type="submit"
          aria-label="search"
          onClick={() => filterSpells()}
        >
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
