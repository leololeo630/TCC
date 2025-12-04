import { use, useState } from "react";
import { Search } from "lucide-react"; // npm i lucide-react
import  ListItem from "../components/user/ListItem";
import { useNavigate } from "react-router-dom";
import { getAllQuestoes } from "../services/questaoService";
import { useEffect } from "react";
import type { Questao } from "../types/Questao";
import type { Assunto } from "../types/Assunto";
import { getAllAssuntos } from "../services/assuntoService";

export default function User() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [data, setData] = useState<Questao[]>([]);
    const [assuntos, setAssuntos] = useState<Assunto[]>([]);
    const [filterType, setFilterType] = useState("texto"); 
    const [showFilters, setShowFilters] = useState(false); 
    const [selectedDisciplina, setSelectedDisciplina] = useState("");
    const [selectedAssunto, setSelectedAssunto] = useState("");
    const [selectedNivel, setSelectedNivel] = useState("");
    useEffect(() => {
      getQuestoes();
      getAssuntos();
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
    
    
    const byFilters = data.filter(item => {
        if (selectedDisciplina && item.assunto.disciplina.nome !== selectedDisciplina) {
          return false;
        }
        if (selectedAssunto && item.assunto.nome !== selectedAssunto) {
          return false;
        }
        if (selectedNivel && item.dificuldade !== selectedNivel) {
          return false;
        }
        return true;
    });

    const byTexto = byFilters.filter(item =>
        item.texto.toLowerCase().includes(search.toLowerCase())
    );
    const byAssunto = byFilters.filter(item =>
        item.assunto.nome.toLowerCase().includes(search.toLowerCase())
    );
    const byDisciplina = byFilters.filter(item =>
        item.assunto.disciplina.nome.toLowerCase().includes(search.toLowerCase())
    );
    const filteredItems =
      byTexto.length > 0 ? byTexto :
      byAssunto.length > 0 ? byAssunto :
      byDisciplina;

    const getAssuntos = async () => {
      console.log('Buscando assuntos...');
      try {
          const response = await getAllAssuntos();
          setAssuntos(response);
          console.log('Assuntos: ', response);
      }catch(err){
          console.error("Erro ao buscar assuntos:", err);
      }
    }
    const handleSearch = () => {
      // A pesquisa é tratada automaticamente pelos filtros aplicados
      console.log('byFilters: ', byFilters);
      console.log('slectedDisciplina: ', selectedDisciplina);
      console.log('selectedAssunto: ', selectedAssunto);
      console.log('selectedNivel: ', selectedNivel);
    }
    return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
        <div className="font-semibold cursor-pointer" onClick={() => navigate("/user")}>User</div>
        <div className="text-lg font-bold text-center absolute left-1/2 transform -translate-x-1/2">Vestibular</div>
        <div className='text-white w-full p-4 flex justify-between items-center'>
            <div className='font-semibold cursor-pointer' onClick={() => navigate("/historico")}>Histórico</div>
            <div className='font-semibold cursor-pointer' onClick={() => navigate("/dashboard")}>Dashboard</div>
        </div>
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
                <div className="relative w-full mb-8 flex gap-2">
                  <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-130 p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <Search
                    onClick={() => handleSearch()}
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  {/* Botão de filtro */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="p-2 border border-gray-300 rounded hover:bg-gray-100"
                  >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h18M6 9h12M9 13.5h6M11 18h2"
                />
              </svg>
              </button>
              {/* Dropdown de filtros */}
              {showFilters && (
                <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-md z-10 p-2 w-48">

                  {/* FILTRO POR DISCIPLINA */}
                <div className="mb-2">
                <label className="text-sm font-semibold">Disciplina:</label>
                <select
                 className="w-full border mt-1 p-1 text-sm rounded"
                 value={selectedDisciplina}
                  onChange={(e) => {
                   setSelectedDisciplina(e.target.value);
                   setSelectedAssunto(""); // limpa o assunto ao trocar disciplina
                   }}
                 >
              <option value="">Todas</option>

              {data
              .map((q) => q.assunto.disciplina)
              .filter(
              (disc, index, arr) =>
              arr.findIndex((d) => d.id === disc.id) === index
              )
              .map((disc) => (
              <option key={disc.id} value={disc.nome}>
              {disc.nome}
            </option>
            ))}
          </select>
          </div>

            {/* FILTRO POR ASSUNTO (dependente da disciplina) */}
            <div className="mb-2">
              <label className="text-sm font-semibold">Assunto:</label>
              <select
                className="w-full border mt-1 p-1 text-sm rounded"
                value={selectedAssunto}
                onChange={(e) => setSelectedAssunto(e.target.value)}
                disabled={!selectedDisciplina}
              >
              <option value="">Todos</option>

              {data
              .filter((q) =>
                selectedDisciplina
                ? q.assunto.disciplina.nome === selectedDisciplina
                : true
                )
                .map((q) => q.assunto)
                .filter(
                  (as, index, arr) =>
                  arr.findIndex((a) => a.id === as.id) === index
                )
                .map((as) => (
                <option key={as.id} value={as.nome}>
                  {as.nome}
                </option>
                 ))}
                 </select>
                </div>

                  {/* FILTRO POR NÍVEL */}
                <div className="mb-2">
                <label className="text-sm font-semibold">Nível:</label>
                <select
                  className="w-full border mt-1 p-1 text-sm rounded"
                  value={selectedNivel}
                  onChange={(e) => setSelectedNivel(e.target.value)}
                  >
                  <option value="">Todos</option>
                  <option value="facil">Fácil</option>
                  <option value="medio">Médio</option>
                 <option value="dificil">Difícil</option>
                 </select>
                </div>

                {/* BOTÃO FECHAR */}
                <button
                onClick={() => setShowFilters(false)}
                className="w-full text-center py-1 mt-2 bg-blue-600 text-white rounded text-sm"
                >
                Fechar
                 </button>
                 </div>
                )}


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