import type { Disciplina } from "./Disciplina";

export interface Assunto {
  id: number;
  nome: string;
  disciplina: Disciplina;
}
