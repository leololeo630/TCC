import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getQuestaoById } from "../services/questaoService";
import type { Questao } from "../types/Questao";
import { useEffect, useState } from "react";
export default function Questao() {
  const { id } = useParams<{ id: string }>();
  const [questao, setQuestao] = useState<Questao | null>(null);

  useEffect(() => {
    async function fetchQuestao() {
      if (!id) return;
      try {
        const data = await getQuestaoById(Number(id));
        setQuestao(data);
      } catch (err) {
        console.error("Erro ao buscar questão:", err);
      }
    }

    fetchQuestao();
  }, [id]);

  console.log('questao: ', questao?.texto);
  const item = {
    id: 1,
    desc: "Resolva a equação: 2x + 3 = 7. Qual o valor de x?",
    disciplina: "Matemática",
    assunto: "Álgebra",
    dificuldade: "Médio",
  };

  /*const respostas = [
    { id: 1, text: "x = 1" },
    { id: 2, text: "x = 2" },
    { id: 3, text: "x = 3" },
    { id: 4, text: "x = 4" },
  ];*/
  const respostas = questao?.alternativas

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
        <div className="font-semibold">User</div>
        <div className="text-lg font-bold">Vestibular</div>
        <div className="w-20" /> {/* espaçamento p/ alinhar */}
      </nav>

      {/* Conteúdo Principal */}
      <div className="relative flex-1">
        {/* Seta esquerda */}
        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black">
          <ChevronLeft size={36} />
        </button>

        <div className="w-4/5 max-w-4xl mx-auto flex flex-col min-h-screen">
          {/* Título + Enunciado (sempre no topo) */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {questao?.assunto?.disciplina?.nome} - {questao?.assunto?.nome}
              </h2>
              <span className="text-xl text-gray-600">Nível - {questao?.dificuldade}</span>
            </div>

            <p className="text-gray-800 text-lg">{questao?.texto}</p>
          </div>

          {/* Alternativas centralizadas verticalmente */}
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full">
              {respostas?.map((resposta) => (
                <div
                  key={resposta.id}
                  className="border border-gray-300 rounded-lg shadow-sm px-4 py-3 w-full hover:bg-gray-100 transition cursor-pointer"
                >
                  {resposta.texto}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seta direita */}
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition cursor-pointer">
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}
