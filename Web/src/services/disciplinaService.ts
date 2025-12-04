import api from "./api";
import type { Disciplina } from "../types/Disciplina";

export async function getAllDisciplinas(): Promise<Disciplina[]> {
    try{
        const response = await api.get("disciplina/");
        return response.data;
    }catch(error){
        console.error("Erro ao buscar disciplinas:", error);
        throw error;
    } 
}
export async function createDisciplina(disciplina: Disciplina): Promise<Disciplina> {
    try{
        const response = await api.post("disciplina/", disciplina);
        return response.data;
    }catch(error){
        console.error("Erro ao criar disciplina:", error);
        throw error;
    }
}
export async function deleteDisciplina(id: number): Promise<void> {
    try{
        await api.delete(`disciplina/${id}/`);
    }catch(error){
        console.error("Erro ao deletar disciplina:", error);
        throw error;
    }
}
export async function updateDisciplina(disciplina: Disciplina): Promise<Disciplina> {
    try{
        const response = await api.put(`disciplina/${disciplina.id}/`, disciplina);
        return response.data;
    }catch(error){
        console.error("Erro ao atualizar disciplina:", error);
        throw error;
    }
}
export async function getDisciplinaById(id: number): Promise<Disciplina> {
    try{
        const response = await api.get(`disciplina/${id}/`);
        return response.data;
    }catch(error){
        console.error("Erro ao buscar disciplina por ID:", error);
        throw error;
    }
}