import { useState, useEffect } from "react";
import { EditAlternativeModal } from "./EditAlternativeModal";

interface EditModalProps {
  id?: number;
  isOpen: boolean;
  title?: string;
  viewMode?: "disciplinas" | "assuntos" | "questoes";
  isEditing?: boolean;
  onClose: () => void;
  onCancel: () => void;
}

export default function EditModal({
  id,
  isOpen,
  title,
  viewMode,
  isEditing,
  onClose,
  onCancel,
}: EditModalProps) {
  const [inputValue, setInputValue] = useState(title ?? "");
  const [dificuldade, setDificuldade] = useState("");
  const [showAlternativasModal, setShowAlternativasModal] = useState(false);
  const [alternativas, setAlternativas] = useState([
    { id: 1, texto: "Alternativa 1", isCorrect: false },
    { id: 2, texto: "Alternativa 2", isCorrect: true },
    { id: 3, texto: "Alternativa 3", isCorrect: false },
    { id: 4, texto: "Alternativa 4", isCorrect: false },
  ]);
  // sempre que o título mudar (novo item clicado), atualizar o input
  useEffect(() => {
    setInputValue(title);
  }, [title]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl">
      <div className="bg-white h-[85vh] rounded-lg shadow-lg p-6 flex flex-col border border-gray-300">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-6 text-center">{id? `Editar Item ID: ${id}` : "Criar Item"}</h2>

        {/* Input */}
        {viewMode === "questoes" ? (
          <>
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full h-48 p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
          <select 
            value={dificuldade}
            onChange={(e) => setDificuldade(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>

          <button
            onClick={() => setShowAlternativasModal(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mb-6"
          >
            Editar alternativas
          </button>
              </>
        ) : (
          <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        )}
        

        {/* Botões */}
        <div className="mt-auto flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-red-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
            console.log("Salvar item:", { id, title }); // futuramente isso vai pro backend
            onClose();
          }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
      {/* ALTERNATIVE MODAL */}
      <EditAlternativeModal
        isOpen={showAlternativasModal}
        listaAlternativas={alternativas}
        onClose={() => setShowAlternativasModal(false)}
        onCancel={() => setShowAlternativasModal(false)}
      />
    </div>
  );
}
