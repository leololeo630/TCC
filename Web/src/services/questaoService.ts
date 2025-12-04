import api from "./api";
import type { Questao } from "../types/Questao";
import type { QuestaoCreate } from "../types/Questao";
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

export async function createQuestao(questao: QuestaoCreate): Promise<Questao> {
    try{
        const response = await api.post("questoes/", questao);
        return response.data;
    }catch(error){
        console.error("Erro ao criar questão:", error);
        throw error;
    }
}

export async function deleteQuestao(id: number): Promise<void> {
    try{
        await api.delete(`questoes/${id}/`);
    }catch(error){
        console.error("Erro ao deletar questão:", error);
        throw error;
    }
}
export async function updateQuestao(questao: Questao): Promise<Questao> {
    try{
        const response = await api.put(`questoes/${questao.id}/`, questao);
        return response.data;
    }catch(error){
        console.error("Erro ao atualizar questão:", error);
        throw error;
    }
}