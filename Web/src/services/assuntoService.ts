import api from "./api";
import type { Assunto, AssuntoUpdate } from "../types/Assunto";
import type { AssuntoCreate } from "../types/Assunto";

export async function getAllAssuntos(): Promise<Assunto[]> {
    try{
        const response = await api.get("assunto/");
        return response.data;
    }catch(error){
        console.error("Erro ao buscar assuntos:", error);
        throw error;
    }
}

export async function createAssunto(assunto: AssuntoCreate): Promise<Assunto> {
    try{
        const response = await api.post("assunto/", assunto);
        return response.data;
    }catch(error){
        console.error("Erro ao criar assunto:", error);
        throw error;
    }
}
export async function deleteAssunto(id: number): Promise<void> {
    try{
        await api.delete(`assunto/${id}/`);
    }catch(error){
        console.error("Erro ao deletar assunto:", error);
        throw error;
    }
}
export async function updateAssunto(assunto: AssuntoUpdate): Promise<Assunto> {
    try{
        const response = await api.put(`assunto/${assunto.id}/`, assunto);
        return response.data;
    }catch(error){
        console.error("Erro ao atualizar assunto:", error);
        throw error;
    }
}