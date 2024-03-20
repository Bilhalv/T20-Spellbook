import React from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import { Bomb, Box, ChevronDown, Filter, FilterX, Search } from "lucide-react";
import { magiaTipo } from "../data/list magias";
import { MagiaCard } from "./MagiaCard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Popover,
  Select,
  TextField,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";

type filtro = {
  tipo: string; //TODO limitar opções
  content: string[] | number[] | string | number; //TODO limitar opções
};

interface SearchDataProps {
  magiaLista: magiaTipo[];
}

function InputCheckboxAccordion({
  setContentInput,
  contentInput,
  label,
  options,
}: {
  setContentInput: (value: string[]) => void;
  contentInput: string[];
  label: string;
  options: string[];
}) {
  const [checked, setChecked] = React.useState(
    options.map((option) => contentInput.includes(option))
  );

  const children = (
    <div className="flex flex-col">
      {options.map((option, idx) => (
        <FormControlLabel
          label={option}
          sx={{ ml: 1 }}
          control={
            <Checkbox
              size="small"
              checked={checked[idx]}
              onChange={(e) => {
                const newChecked = [...checked];
                newChecked[idx] = e.target.checked;
                setChecked(newChecked);
                setContentInput(
                  newChecked.map((e, idx) => (e ? options[idx] : ""))
                );
              }}
            />
          }
        />
      ))}
    </div>
  );

  return (
    <>
      <Accordion
        sx={{
          "& ": {
            bgcolor: "rgba(255,255,255,0)",
            boxShadow: "none",
            gap: 0,
            "& .MuiAccordionSummary-root": {
              "& .MuiAccordionSummary-content": {
                margin: 0,
              },
              minHeight: "fit-content",
            },
          },
        }}
      >
        <AccordionSummary expandIcon={<ChevronDown />}>
          <FormControlLabel
            label={label}
            control={
              <Checkbox
                checked={checked.every((e) => e)}
                indeterminate={
                  checked.some((e) => e) && checked.some((e) => !e)
                }
                onChange={(e) => {
                  const newChecked = checked.map(() => e.target.checked);
                  setChecked(newChecked);
                  setContentInput(
                    newChecked.map((e, idx) => (e ? options[idx] : ""))
                  );
                }}
              />
            }
          />
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </>
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

  const [filterOpen, setFilterOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setFilterOpen(!filterOpen);
  };
  const defaultFilters: filtro[] = [
    { tipo: "Classificação", content: ["Arcana", "Universal", "Divina"] },
    { tipo: "Círculo", content: "" },
    {
      tipo: "Escola",
      content: [
        "Abjuração",
        "Adivinhação ",
        "Convocação ",
        "Encantamento",
        "Evocação",
        "Ilusão",
        "Necromancia",
        "Transmutação",
      ],
    },
  ];
  const [filters, setFilters] = React.useState<filtro[]>(defaultFilters);

  function addFilter(e: string[] | string, label: string) {
    const oldFilters = [...filters];
    const foundFilter = oldFilters.find((filter) => filter.tipo === label);
    if (foundFilter) {
      if (e[0] === "") {
      } else {
        oldFilters.map((filter) => {
          if (filter.tipo === label) {
            filter.content = e;
          }
        });
      }
    } else {
      oldFilters.push({ tipo: label, content: e });
    }
    setFilters(oldFilters);
  }

  function filterSpells() {
    if (
      input === "" &&
      JSON.stringify(filters) === JSON.stringify(defaultFilters)
    ) {
      setSpells(complete);
      return;
    } else {
      let newSpells = [...complete];
      let dictionary: {
        0: string;
        1: string;
      }[] = [
        ["Classificação", "tipo"],
        ["Círculo", "circulo"],
        ["Escola", "escola"],
      ];
      filters.forEach((filter) => {
        if (Array.isArray(filter.content)) {
          const dict = dictionary.find((dict) => dict[0] === filter.tipo);
          if (dict) {
            newSpells = newSpells.filter((spell) => {
              if (dict === dictionary[1]) {
                console.log(spell[dict[1]] === filter.content);
                return (
                  (spell[dict[1]] as string) === (filter.content as string)
                );
              }
              return (filter.content as string[]).includes(
                spell[dict[1]] as string
              );
            });
          }
        } else {
          newSpells = newSpells.filter((spell) => {
            return spell[dictionary[1][1]] === filter.content;
          });
        }
      });
      if (input) {
        newSpells = newSpells.filter((spell) => {
          return spell.nome.toLowerCase().includes(input as string);
        });
      }
      setSpells(newSpells);
    }
  }
  return (
    <>
      <div className="desktop:w-5/6 bg-white/90 p-4 rounded-xl desktop:mx-auto mx-4">
        <div className="flex w-full mx-auto border rounded-2xl p-2 mt-2">
          <Badge
            badgeContent={filters.reduce((acc, filter, idx) => {
              if (filter.content !== defaultFilters[idx].content) {
                if (
                  Array.isArray(filter.content) &&
                  JSON.stringify(filter.content) ===
                    JSON.stringify(defaultFilters[idx].content as string[])
                ) {
                  return acc;
                }
                return acc + 1;
              } else {
                return acc;
              }
            }, 0)}
            color="error"
          >
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
              <InputCheckboxAccordion
                contentInput={[...(filters[2].content as string[])]}
                setContentInput={(e) => {
                  addFilter(e, "Escola");
                }}
                label="Escola"
                options={defaultFilters[2].content as string[]}
              />
              <InputCheckboxAccordion
                contentInput={[...(filters[0].content as string[])]}
                setContentInput={(e) => {
                  addFilter(e, "Classificação");
                }}
                label="Classificação"
                options={defaultFilters[0].content as string[]}
              />
              <TextField
                label="Círculo"
                id="select"
                select
                value={filters[1].content as string}
                onChange={(e) => {
                  if (!e.target.value) {
                    addFilter("", "Círculo");
                  } else {
                    addFilter(e.target.value as string, "Círculo");
                  }
                }}
              >
                <MenuItem value={""}>Todos</MenuItem>
                {[...new Array(5)].map((_, idx) => (
                  <MenuItem
                    key={idx + 1}
                    value={(idx + 1) as unknown as string}
                  >
                    {idx + 1}
                  </MenuItem>
                ))}
              </TextField>
              <ButtonGroup fullWidth>
                <Button
                  onClick={() => {
                    setFilterOpen(false);
                    setFilters(defaultFilters);
                    setSpells(complete);
                  }}
                  color="error"
                >
                  <FilterX />
                </Button>
                <Button
                  color="success"
                  onClick={() => {
                    filterSpells();
                    setFilterOpen(false);
                  }}
                >
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
        <div className="flex flex-col justify-center gap-4 mt-5 w-fit">
          {spells.map((spell, idx) => (
            <MagiaCard key={idx} magia={spell} />
          ))}
        </div>
      </div>
    </>
  );
}
