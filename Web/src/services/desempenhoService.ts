import api from "./api";

export async function getDesempenhoUsuario(): Promise<any> {
    try{
        const response = await api.get("desempenho/");
        return response.data;
    }catch(error){
        console.error("Erro ao buscar desempenho do usuário:", error);
        throw error;
    }
}