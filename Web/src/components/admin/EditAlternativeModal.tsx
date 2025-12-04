import { useState, useEffect } from "react";
import type { AlternativaCreate } from "../../types/Alternativa";
import type { Alternativa } from "../../types/Alternativa";
interface Alternativa {
    id?: number;
    texto: string;
    isCorrect: boolean;
}

interface EditAlternativeModalProps {
    listaAlternativas: Alternativa[];
    isOpen: boolean;
    onClose: () => void;
    onCancel: () => void;
    onSave?: (lista: Alternativa[]) => void;
}
export function EditAlternativeModal ({
    listaAlternativas,
    isOpen,
    onClose,
    onCancel,
    onSave,
}: EditAlternativeModalProps) {
    
    const [alternativas, setAlternativas] = useState<Alternativa[]>(listaAlternativas);
    useEffect(() => {
        setAlternativas(listaAlternativas ?? []);
    }, [listaAlternativas]);
    const addAlternative = () => {
        setAlternativas(prev => [...prev, { texto: "", isCorrect: false }]);
    };

    const removeAlternative = (index: number) => {
        setAlternativas(prev => prev.filter((_, i) => i !== index));
    };

    const updateText = (index: number, value: string) => {
        setAlternativas(prev =>
            prev.map((alt, i) => i === index ? { ...alt, texto: value } : alt)
        );
    };

    const setCorrect = (index: number) => {
        setAlternativas(prev =>
            prev.map((alt, i) => ({ ...alt, isCorrect: i === index }))
        );
    };
    
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white h-[85vh] w-full max-w-xl rounded-lg shadow-lg p-6 flex flex-col border border-gray-300">

        {/* título */}
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Alternativas</h2>

        {/* lista de alternativas */}
        <div className="flex flex-col gap-4 overflow-y-auto pr-2">
          {alternativas.map((alt, i) => (
            <div key={i} className="flex items-center gap-3">

              {/* radio do correto */}
              <input
                type="radio"
                checked={alt.isCorrect}
                onChange={() => setCorrect(i)}
              />

              {/* texto */}
              <input
                type="text"
                value={alt.texto}
                onChange={(e) => updateText(i, e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded"
                placeholder="Texto da alternativa"
              />

              {/* remover */}
              <button
                className="px-3 py-1 bg-red-300 rounded hover:bg-red-400"
                onClick={() => removeAlternative(i)}
              >
                -
              </button>

            </div>
          ))}
        </div>

        {/* adicionar alternativa */}
        <button
          onClick={addAlternative}
          className="mt-4 w-full py-2 bg-green-400 text-white rounded hover:bg-green-500"
        >
          + adicionar alternativa
        </button>

        {/* botões inferiores */}
        <div className="mt-auto flex justify-between pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
            console.log("Salvar alternativas:", alternativas); // futuramente isso vai pro backend
            if(onSave){
                onSave(alternativas);
            }
            onClose();
          }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
    ) 
}