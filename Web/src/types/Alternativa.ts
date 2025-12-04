export interface Alternativa {
  id: number;
  texto: string;
  is_correct: boolean;
}
export interface AlternativaCreate {
  texto: string;
  is_correct: boolean;
  questao: number;
}
export interface AlternativaUpdate {
  id: number;
  texto: string;
  is_correct: boolean;
  questao: number;
}