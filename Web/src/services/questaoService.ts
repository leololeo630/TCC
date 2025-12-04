import api from "./api";
import type { Questao } from "../types/Questao";

export async function getQuestaoById(id: number): Promise<Questao> {
    try {
        const response = await api.get(`questoes/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar questão:", error);
        throw error;
    }
}

export async function getAllQuestoes(): Promise<Questao[]> {
    try{
        const response = await api.get("questoes/");
        return response.data;
    }catch(error){
        console.error("Erro ao buscar questões:", error);
        throw error;
    }
}

export async function getNextQuestao(id: number): Promise<Questao | null> {
    try {
        const response = await api.get(`questoes/next/?last_id=${id}`);
        return response.data;
    }catch (error) {
        console.error("Erro ao buscar próxima questão:", error);
        return null;
    }
}