import { use, useState } from "react";
import { Search } from "lucide-react"; // npm i lucide-react
import  ListItem from "../components/user/ListItem";
import { useNavigate } from "react-router-dom";
import { getAllQuestoes } from "../services/questaoService";
import { useEffect } from "react";
import type { Questao } from "../types/Questao";
export default function User() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [data, setData] = useState<Questao[]>([]);
    useEffect(() => {
      getQuestoes();
    }, []);
    const getQuestoes = async () => {
      try {
          const response = await getAllQuestoes();
          setData(response);
          console.log('Questoes: ', response);
          //console.log('id: ', data[0].id, ' texto: ', data[0].texto, ' dificuldade: ', data[0].dificuldade, ' assunto: ', data[0].assunto.nome, ' disciplina: ', data[0].assunto.disciplina.nome);
      }catch(err){
          console.error("Erro ao buscar questões:", err);
      }
    }
     
    const byTexto = data.filter(item =>
        item.texto.toLowerCase().includes(search.toLowerCase())
    );
    const byAssunto = data.filter(item =>
        item.assunto.nome.toLowerCase().includes(search.toLowerCase())
    );
    const byDisciplina = data.filter(item =>
        item.assunto.disciplina.nome.toLowerCase().includes(search.toLowerCase())
    );
    const filteredItems =
      byTexto.length > 0 ? byTexto :
      byAssunto.length > 0 ? byAssunto :
      byDisciplina;
    return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
        <div className="font-semibold">User</div>
        <div className="text-lg font-bold">Vestibular</div>
        <div className="w-20" /> {/* espaçamento p/ alinhar */}
      </nav>
     {/* Conteúdo principal */}
        <main className="flex flex-1 justify-center items-start pt-12">
            <div className="flex flex-col items-center w-full max-w-xl">
                {/* Título */}
                <h1 className="text-4xl font-extrabold mb-10 text-center">
                  Página de Questões
                </h1>
      
                {/* Barra de pesquisa com ícone */}
                <div className="relative w-full mb-8">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
      
                {/* Lista */}
                <div className="flex flex-col gap-4 w-full">
                  {filteredItems.map((item) => (
                      <ListItem key={item.id} desc={item.texto} disciplina={item.assunto.disciplina.nome} assunto={item.assunto.nome} dificuldade={item.dificuldade}
                      onClick={() => {navigate(`/questao/${item.id}`)}}/>
                  ))}
                </div>
            </div>
        </main>
    </div>
    );
}