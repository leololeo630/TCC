import type {Questao} from "./Questao";

export interface Historico {
    id: number;
    user: number;
    questao: Questao;
    resolvida: boolean;
}

export interface CreateHistorico {
  user: number;
  questao: number;
  resolvida: boolean;
};