import api from "./api";
import type { CreateHistorico } from "../types/Historico";
import type { Historico } from "../types/Historico";

export async function addHistorico(historico: Omit<CreateHistorico, "id">): Promise<Historico> {
    try {
        const response = await api.post("historico/", historico);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar histórico:", error);
        throw error;
    }
}