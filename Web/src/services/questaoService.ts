import api from "./api";
import type { Questao } from "../types/Questao";

export async function getQuestaoById(id: number): Promise<Questao> {
    try {
        const response = await api.get(`questoes/1/`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar questão:", error);
        throw error;
    }
}