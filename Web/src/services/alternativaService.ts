import api from "./api";
import type { Alternativa } from "../types/Alternativa";
import type { AlternativaCreate, AlternativaUpdate } from "../types/Alternativa";

export async function createAlternativa(alternativa: AlternativaCreate): Promise<Alternativa> {
    try{
        const response = await api.post("alternativa/", alternativa);
        return response.data;
    }catch(error){
        console.error("Erro ao criar alternativa:", error);
        throw error;
    }
}
export async function updateAlternativa(alternativa: AlternativaUpdate): Promise<Alternativa> {
    try{
        const response = await api.put(`alternativa/${alternativa.id}/`, alternativa);
        return response.data;
    }catch(error){
        console.error("Erro ao atualizar alternativa:", error);
        throw error;
    }
}