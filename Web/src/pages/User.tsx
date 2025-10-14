import { useState } from "react";
import { Search } from "lucide-react"; // npm i lucide-react
import  ListItem from "../components/user/ListItem";


export default function User() {
    const [search, setSearch] = useState("");

    const items = [
        { id: 1, desc: "Prova de Matemática", disciplina: "Matemática", assunto: "Álgebra", dificuldade: "Médio" },
        { id: 2, desc: "Prova de Português", disciplina: "Português", assunto: "Gramática", dificuldade: "Fácil" },
        { id: 3, desc: "Prova de Redação", disciplina: "Redação", assunto: "Argumentação", dificuldade: "Difícil" },
    ];
    const filteredItems = items.filter((item) =>
        item.desc.toLowerCase().includes(search.toLowerCase())
    );  
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
                      <ListItem key={item.id} desc={item.desc} disciplina={item.disciplina} assunto={item.assunto} dificuldade={item.dificuldade}/>
                  ))}
                </div>
            </div>
        </main>
    </div>
    );
}