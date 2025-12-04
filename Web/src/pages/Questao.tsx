import { useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getQuestaoById } from "../services/questaoService";
import type { Questao } from "../types/Questao";
import type { CreateHistorico } from "../types/Historico";
import { addHistorico } from "../services/historicoService";
import { useEffect, useState } from "react";
import { getNextQuestao } from "../services/questaoService";
import { useNavigate } from "react-router-dom";

export default function Questao() {
  const { id } = useParams<{ id: string }>();
  const [questao, setQuestao] = useState<Questao | null>(null);
  const [answered, setAnswered] = useState(false);
  const [history, setHistory] = useState<number[]>([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    if(id){
      setHistory(prev => {
        const numId = Number(id);
        if (prev[prev.length - 1 ] === numId) return prev;
        return [...prev, numId];
      })
    }
    setAnswered(false);
  }, [id]);

  console.log('questao: ', questao?.texto);

  const respostas = questao?.alternativas

  const handleSelect = async (questaoId:number, resposta:boolean) => {
    if (answered) return; 
    const historico: Omit<CreateHistorico, "id"> = {
      user: 1, 
      questao: questaoId,
      resolvida: resposta, 
    };
    const save = await addHistorico(historico);
    setAnswered(true);
    console.log('Historico salvo: ', save);
  }

  const handleMove = async (move:string) => {
    if (move === 'next'){
    try {
      const nextQuestao = await getNextQuestao(Number(id));
      console.log('Próxima questão: ', nextQuestao);
      if (nextQuestao) {
        console.log('devo ir para proxima questao')
        navigate(`/questao/${nextQuestao.id}`);
      }
    } catch (err) {
      console.error("Erro ao buscar próxima questão:", err);
    }
    } else{
      console.log('estou em voltar')
      setHistory( prev => {
        if (prev.length <= 1) return prev;
        
        const newHistory = [...prev];
        newHistory.pop();
        const prevId = newHistory[newHistory.length -1];

        navigate(`/questao/${prevId}`);
        return newHistory;
      })
    }

  }

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
        <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition cursor-pointer"
        onClick={() => handleMove('prev') }>
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
                  className={`
                    border rounded-lg shadow-sm px-4 py-3 w-full transition cursor-pointer
                    ${answered  
                      ? resposta.is_correct
                        ? "border-green-600 bg-green-100 text-green-900"
                        : "border-red-600 bg-red-100 text-red-900"
                        : "border-gray-300 hover:bg-gray-100"
  }
`}
                  onClick={() => handleSelect(questao?.id, resposta.is_correct)}
                >
                  {resposta.texto}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seta direita */}
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition cursor-pointer"
        onClick={() => handleMove('next') }>
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}
