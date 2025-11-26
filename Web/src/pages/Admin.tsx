import { useState } from "react";
import { Search } from "lucide-react"; // npm i lucide-react
import  ListItem from "../components/admin/ListItem";
import AddItem from "../components/admin/AddItem";
import EditModal from "../components/admin/EditModal";

export default function Admin() {
  const [search, setSearch] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEditItem, setSelectedEditItem] = useState<{ id: number; title: string } | null>(null);
  const [selectedItem, setSelectedItem] = useState<{ id: number;} | null>(null);
  const [viewMode, setViewMode] = useState<"disciplinas" | "assuntos" | "questoes">("disciplinas");

 // itens Disciplinas (exemplo estático)
  const disciplinas = [
    { id: 1, title: "Matemática" },
    { id: 2, title: "Português" },
    { id: 3, title: "História" },
  ];

  // itens assuntos (exemplo estático)
  const assuntos = [
    { id: 1, title: "trigonometria", disciplinaId: 1 },
    { id: 2, title: "Conjunção Verbal", disciplinaId: 2 },
    { id: 3, title: "História Do Brasil", disciplinaId: 3 },
  ];
  // itens questoes (exemplo estático)
  const questoes = [
    { id: 1, title: "se um triangulo xxxx", assuntoId: 1 },
    { id: 2, title: "qual o futuro do verbo comprar", assuntoId: 2 },
    { id: 3, title: "em que ano o foi declarada a independencia do Brasil", assuntoId: 3 },
  ];

  const handleSelect = (item) => {
    setSelectedItem(item);
    if (viewMode === "disciplinas") {
      setViewMode("assuntos");
      return;
    }
    if (viewMode === "assuntos") {
      setViewMode("questoes");
      return;
    }
  }

  const handleBack = () => {
    
    if (viewMode === "assuntos") {
      setViewMode("disciplinas");
    }
    else if (viewMode === "questoes") {
      const assunto = assuntos.find(a => a.id === (selectedItem?.assuntoId ?? selectedItem?.id));
      setSelectedItem(assunto ? { id: assunto.disciplinaId } : null);
      setViewMode("assuntos");
    }
    return;
  }

  const getFilteredItems = () => {
    if (viewMode === "disciplinas") {
      return disciplinas.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (viewMode === "assuntos"){
      return assuntos.filter((item) =>
        item.disciplinaId === selectedItem?.id &&
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return questoes.filter((item) =>
      item.assuntoId === selectedItem?.id &&
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  const filteredItems = getFilteredItems();
  

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
        <div className="font-semibold">User</div>
        <div className="text-lg font-bold">Administração</div>
        <div className="w-20" /> {/* espaçamento p/ alinhar */}
      </nav>

      {/* Conteúdo principal */}
      <main className="flex flex-1 justify-center items-start pt-12">
        <div className="flex flex-col items-center w-full max-w-xl">
          {/* Título */}
          <h1 className="text-4xl font-extrabold mb-10 text-center">
            Painel de Administração
          </h1>
          <div className="flex w-full mb-8 items-center gap-2">
          {viewMode !== "disciplinas" && (
            <button
              className="px-3 py-2 border border-gray-300 rounded bg-white shadow-sm hover:bg-gray-100"
              onClick={ handleBack }
          > Voltar </button>
          )}
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
          </div>

          {/* Lista */}
          <div className="flex flex-col gap-4 w-full">
            {filteredItems.map((item) => (
                <ListItem key={item.id} title={item.title}
                 onEdit={() => {
                    setSelectedEditItem(item);
                    setIsEditOpen(true);
                }}
                onSelect={() => {
                  handleSelect(item);
                }}
                />
            ))}
            
            <AddItem 
              onAdd={() => {
                setSelectedEditItem(null)
                console.log("Adicionar novo item em", viewMode);
                setIsEditOpen(true)
              }}
            />
            {isEditOpen && (
            <EditModal 
                id={selectedEditItem?.id}
                isOpen={isEditOpen}
                title={selectedEditItem?.title}
                viewMode={viewMode}
                isEditing={selectedEditItem !== null}
                onClose={() => setIsEditOpen(false)}
                onCancel={() => setIsEditOpen(false)}
            />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
