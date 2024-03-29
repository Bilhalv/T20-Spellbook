import React from "react";
import { magiaTipo } from "../data/list magias";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { IconButton } from "@mui/material";
import { Trash } from "lucide-react";

interface magiaCardProps {
  magia: magiaTipo;
  onDelete?: () => void;
}

export function MagiaCard({ magia, onDelete }: magiaCardProps) {
  type classificacoes = "Arcana" | "Divina" | "Universal";

  type escolas =
    | "Abjuração"
    | "Adivinhação"
    | "Convocação"
    | "Encantamento"
    | "Evocação"
    | "Ilusão"
    | "Necromancia"
    | "Transmutação";

  const selectClassificacao: Record<classificacoes, string> = {
    Arcana: "bg-magia_arcana",
    Divina: "bg-magia_divina",
    Universal: "bg-magia_universal",
  };

  const selectEscola: Record<escolas, string> = {
    Abjuração: "/magias/escolas/abjuracao.svg",
    Adivinhação: "/magias/escolas/adivinhacao.svg",
    Convocação: "/magias/escolas/convocacao.svg",
    Encantamento: "/magias/escolas/encantamento.svg",
    Evocação: "/magias/escolas/evocacao.svg",
    Ilusão: "./magias/escolas/ilusao.svg",
    Necromancia: "/magias/escolas/necromancia.svg",
    Transmutação: "/magias/escolas/transmutacao.svg",
  };
  const [isDisabled, setIsDisabled] = React.useState(false);
  return (
    <div className="bg-bg-t20 px-5 py-2 border-opacity-25 rounded-xl font-tormenta  mx-auto w-full">
      <Accordion
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
        }}
        disabled={isDisabled}
      >
        <AccordionSummary>
          {onDelete && (
            <IconButton
              onClick={async () => {
                await onDelete();
              }}
              sx={{
                zIndex: 5,
                bgcolor: "red",
                position: "absolute",
                left: "0",
                "&:hover": {
                  bgcolor: "rgb(255, 0, 0, 0.5)",
                },
              }}
            >
              <Trash />
            </IconButton>
          )}
          <div className="flex justify-between items-center w-full">
            <p className="flex flex-col w-full">
              <p className="text-center text-xl">
                <b className="text-red-600 bg-magia_arcana">{magia.nome}</b>
              </p>
              <div className="flex flex-wrap text-white text-sm justify-evenly gap-2">
                <p className="flex gap-2">
                  <img
                    src="/magias/dados/execucao.svg"
                    className="w-5 h-5 inline-block"
                  />
                  <p>{magia.execucao}</p>
                </p>
                <p className="flex gap-2">
                  <img
                    src="/magias/dados/alcance.svg"
                    className="w-5 h-5 inline-block"
                  />
                  <p>{magia.alcance}</p>
                </p>
                <p className="flex gap-2">
                  <img
                    src="/magias/dados/duracao.svg"
                    className="w-5 h-5 inline-block"
                  />
                  <p>{magia.duracao}</p>
                </p>
                {magia.resistencia && (
                  <p className="flex gap-2">
                    <img
                      src="/magias/dados/resistencia.svg"
                      className="w-5 h-5 inline-block"
                    />
                    <p>{magia.resistencia}</p>
                  </p>
                )}
                <p className="flex gap-2">
                  <img
                    src="/magias/dados/alvo.svg"
                    className="w-5 h-5 inline-block"
                  />
                  <p>{magia.alvo}</p>
                </p>
              </div>
            </p>
            <p
              className={
                selectClassificacao[magia.tipo] +
                " w-14 h-14 flex bg-center bg-no-repeat bg-cover p-4 justify-center"
              }
            >
              <img src={selectEscola[magia.escola as escolas]} />
              <p className="text-white text-xs font-bold ml-1">
                {magia.circulo}
              </p>
            </p>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="bg-white bg-opacity-75 p-2 rounded-xl text-justify font-poppins">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;{magia.desc}.</p>
            {magia.aprimoramentos &&
              magia.aprimoramentos.map((aprimoramento, index) =>
                aprimoramento.pm > 0 ? (
                  <p key={index}>
                    &nbsp;
                    <b className="text-red-600 font-tormenta">
                      +{aprimoramento.pm}pm
                    </b>
                    <i>&nbsp;{aprimoramento.desc}.</i>
                  </p>
                ) : (
                  <p key={index}>
                    <b className="text-red-600">Truque</b>&nbsp;
                    {aprimoramento.desc}.
                  </p>
                )
              )}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
