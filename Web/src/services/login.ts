import api from "./api";
import type { AuthResponse } from "../types/Auth";

export async function login(username: string, password: string): Promise<AuthResponse> {
    try {
        const response = await api.post("login/", { username, password });
        return response.data;
    }
    catch (error) {
        console.error("Erro ao fazer login:", error);
        throw error;
    }
}