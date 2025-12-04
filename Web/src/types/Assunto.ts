import type { Disciplina } from "./Disciplina";

export interface Assunto {
  id: number;
  nome: string;
  disciplina: Disciplina;
}
export interface AssuntoCreate {
  nome: string;
  disciplina: number; 
}
export interface AssuntoUpdate {
  id: number;
  nome: string;
  disciplina: number; 
}