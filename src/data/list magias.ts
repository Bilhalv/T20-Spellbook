
interface aprimoramentoTipo {
  pm: number;
  desc: string;
}

export interface magiaTipo {
  nome: string;
  desc: string;
  tipo: string;
  escola: string;
  alcance: string;
  alvo: string;
  circulo: number;
  duracao: string;
  execucao: string;
  resistencia: string;
  aprimoramentos: aprimoramentoTipo[];
}

export const magiasListTEMPORARIA: magiaTipo[] = [
  {
    nome: "Abençoar Alimentos",
    desc:
      "Você purifica e abençoa uma porção de comida ou dose de bebida. Isso torna um alimento sujo, estragado ou envenenado próprio para consumo. Além disso, se for consumido até o final da duração, o alimento oferece 5 PV temporários ou 1 PM temporário (além de quaisquer bônus que já oferecesse). Bônus de alimentação duram um dia e cada personagem só pode receber um bônus de alimentação por dia",
    execucao: "Padrão",
    alcance: "Curto",
    alvo: "Alimento para 1 criatura",
    duracao: "Cena",
    resistencia: "",
    escola: "Transmutação",
    aprimoramentos: [
      {
        pm: 1,
        desc: "Aumenta o número de alvos em +1",
      },
      {
        pm: 1,
        desc:
          "Muda a duração para permanente, o alvo para 1 frasco com água e adiciona componente material (pó de prata no valor de T$ 5). Em vez do normal, cria um frasco de água benta",
      },
    ],
    tipo: "Divina",
    circulo: 1,
  },
  {
    nome: "Acalmar Animal",
    desc:
      "O animal fica prestativo em relação a você. Ele não fica sob seu controle, mas percebe suas palavras e ações da maneira mais favorável possível. Você recebe +10 nos testes de Adestramento e Diplomacia que fizer contra o animal. Um alvo hostil ou que esteja envolvido em um combate recebe +5 em seu teste de resistência. Se você ou seus aliados tomarem qualquer ação hostil contra o alvo, a magia é dissipada e ele retorna à atitude que tinha antes (ou piorada, de acordo com o mestre). Se tratar bem o alvo, a atitude pode permanecer mesmo após o término da magia",
    execucao: "Padrão",
    alcance: "Curto",
    alvo: "1 animal",
    duracao: "Cena",
    resistencia: "Vontade anula",
    escola: "Encantamento",
    aprimoramentos: [
      {
        pm: 1,
        desc: "Muda o alcance para médio",
      },
      {
        pm: 1,
        desc:
          "Muda o alvo para 1 monstro ou espírito com Inteligência 1 ou 2",
      },
      {
        pm: 2,
        desc: "Aumenta o número de alvos em +1",
      },
      {
        pm: 5,
        desc: "Muda o alvo para 1 monstro ou espírito. Requer 3º círculo",
      },
    ],
    tipo: "Divina",
    circulo: 1,
  },
  {
    nome: "Adaga Mental",
    desc:
      "Você manifesta e dispara uma adaga imaterial contra a mente do alvo, que sofre 2d6 pontos de dano psíquico e fica atordoado por uma rodada. Se passar no teste de resistência, sofre apenas metade do dano e evita a condição. Uma criatura só pode ficar atordoada por esta magia uma vez por cena",
    execucao: "Padrão",
    alcance: "Curto",
    alvo: "1 criatura",
    duracao: "Instantânea",
    resistencia: "Vontade parcial",
    escola: "Encantamento",
    aprimoramentos: [
      {
        pm: 1,
        desc:
          "Você lança a magia sem gesticular ou pronunciar palavras (o que permite lançar esta magia de armadura) e a adaga se torna invisível. Se o alvo falhar no teste de resistência, não percebe que você lançou uma magia contra ele",
      },
      {
        pm: 2,
        desc:
          "Muda a duração para um dia. Além do normal, você “finca” a adaga na mente do alvo. Enquanto a magia durar, você sabe a direção e localização do alvo, desde que ele esteja no mesmo mundo",
      },
      {
        pm: 2,
        desc: "Aumenta o dano em +1d6",
      },
    ],
    tipo: "Arcana",
    circulo: 1,
  },
]