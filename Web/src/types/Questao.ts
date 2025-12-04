import type { Assunto } from "./Assunto";
import type { Alternativa } from "./Alternativa";

export interface Questao {
  id: number;
  texto: string;
  dificuldade: string;
  assunto: Assunto;
  alternativas: Alternativa[];
}
export interface QuestaoCreate {
  texto: string;
  dificuldade: string;
  assunto: number;
}
export interface QuestaoUpdate {
  id: number;
  texto: string;
  dificuldade: string;
  assunto: number;
}