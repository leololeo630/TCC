import { useState, useEffect } from "react";

interface EditModalProps {
  id: number;
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onCancel: () => void;
}

export default function EditModal({
  id,
  isOpen,
  title,
  onClose,
  onCancel,
}: EditModalProps) {
  const [inputValue, setInputValue] = useState(title);

  // sempre que o título mudar (novo item clicado), atualizar o input
  useEffect(() => {
    setInputValue(title);
  }, [title]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl">
      <div className="bg-white h-[70vh] rounded-lg shadow-lg p-6 flex flex-col border border-gray-300">
        {/* Título */}
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Item ID: {id}</h2>

        {/* Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

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
    </div>
  );
}
