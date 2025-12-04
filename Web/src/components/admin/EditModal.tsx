import { useState, useEffect, use } from "react";
import { EditAlternativeModal } from "./EditAlternativeModal";
import type { Disciplina } from "../../types/Disciplina";
import type { Assunto } from "../../types/Assunto";
import type { AssuntoCreate, AssuntoUpdate } from "../../types/Assunto";
import type { Questao, QuestaoUpdate } from "../../types/Questao";
import type { QuestaoCreate } from "../../types/Questao";
import type { Alternativa, AlternativaUpdate } from "../../types/Alternativa";
import type { AlternativaCreate } from "../../types/Alternativa";
import { createDisciplina } from "../../services/disciplinaService";
import { createAssunto } from "../../services/assuntoService";
import { createQuestao, updateQuestao } from "../../services/questaoService";
import { getDisciplinaById } from "../../services/disciplinaService";
import { createAlternativa, updateAlternativa } from "../../services/alternativaService";
import { getQuestaoById } from "../../services/questaoService";
import { updateDisciplina } from "../../services/disciplinaService";
import { updateAssunto } from "../../services/assuntoService";
interface EditModalProps {
  id?: number;
  isOpen: boolean;
  title?: string;
  viewMode?: "disciplinas" | "assuntos" | "questoes";
  isEditing?: boolean;
  parentId?: number;
  onClose: () => void;
  onCancel: () => void;
}

export default function EditModal({
  id,
  isOpen,
  title,
  viewMode,
  isEditing,
  parentId,
  onClose,
  onCancel,
}: EditModalProps) {
  const [inputValue, setInputValue] = useState(title ?? "");
  const [dificuldade, setDificuldade] = useState("facil");
  const [showAlternativasModal, setShowAlternativasModal] = useState(false);
  const [alternativas, setAlternativas] = useState([]);
  // sempre que o título mudar (novo item clicado), atualizar o input
  useEffect(() => {
    setInputValue(title);
  }, [title]);
  useEffect(() => {
    async function fetchItem() {
      if (id && isEditing && viewMode === "questoes") {
        try {
          const data: Questao = await getQuestaoById(id);
          setDificuldade(data.dificuldade);
          if (data.alternativas) {
            const lista = data.alternativas.map((alt: any) => ({
            id: alt.id,
            texto: alt.texto,
            is_correct: alt.is_correct,
          }));
          setAlternativas(lista);
        }
        } catch (err) {
          console.error("Erro ao buscar questão para editar:", err);
        }
      }
    }
    fetchItem();
  }, [id, isEditing, viewMode]);

  if (!isOpen) return null;

  const handleSave = async () =>{
    if (id) {
      if(viewMode === "disciplinas"){
        try{
          const updated: Disciplina = {
            id: id,
            nome: inputValue,
          };
          const result = await updateDisciplina(updated);
          console.log('Disciplina atualizada: ', result);
        }catch(err){
          console.error("Erro ao atualizar disciplina:", err);
        }
      }else if(viewMode === "assuntos"){
        try{
          const updated: AssuntoUpdate = {
            id: id,
            nome: inputValue,   
            disciplina: parentId,
        }
          console.log('Assunto para atualizar: ', updated);
          const result = await updateAssunto(updated);
          console.log('Assunto atualizado: ', result);
        }catch(err){
          console.error("Erro ao atualizar assunto:", err);
        }
      }else if(viewMode === "questoes"){
        try{
          const updated: QuestaoUpdate = {
            id: id,
            texto: inputValue,
            dificuldade: dificuldade,
            assunto: parentId,
          };
          const result = await updateQuestao(updated);
          console.log('Questão atualizada: ', result);
          const updatedAlternativas: AlternativaUpdate[] = alternativas.map((alt: any, index: number) => ({
            id: alt.id, 
            texto: alt.texto,
            is_correct: alt.is_correct,
            questao: id,
          }));
          console.log('Alternativas para atualizar: ', updatedAlternativas);
          for (const alt of updatedAlternativas) {
            if(alt.id === undefined){
              const newAlt: Omit<AlternativaCreate, "id"> = {
                texto: alt.texto,
                is_correct: alt.is_correct,
                questao: id,
              };
              const createdAlt = await createAlternativa(newAlt);
              console.log('Alternativa criada: ', createdAlt);
            }else{
            try{
              const resultAlt = await updateAlternativa(alt);
              console.log('Alternativa atualizada: ', resultAlt);
            }catch(err){
              console.error("Erro ao atualizar alternativa:", err);
            }
          }
          }

        }catch(err){
          console.error("Erro ao atualizar questão:", err);
        }
      }
    }else{
      if(viewMode === "disciplinas"){
        const newDisciplina: Omit<Disciplina, "id"> = {
          nome: inputValue,
        };
        try{
          const created = await createDisciplina(newDisciplina as Disciplina);
          console.log('Disciplina criada: ', created);
        }catch(err){
          console.error("Erro ao criar disciplina:", err);
        }
    }else if(viewMode === "assuntos"){
      let parentDisciplina: Disciplina | null = null;
      try{
        parentDisciplina = parentId ? await getDisciplinaById(parentId) : null;
      }catch(err){
        console.error("Erro ao buscar disciplina pai:", err);
      }
      const newAssunto: Omit<AssuntoCreate, "id"> = {
        nome: inputValue,
        disciplina: parentId ? parentId : (parentDisciplina ? parentDisciplina.id : 0),
      };
      try{
        const created = await createAssunto(newAssunto as AssuntoCreate);
        console.log('Assunto criado: ', created);
      }catch(err){
        console.error("Erro ao criar assunto:", err);
      }
    } else if(viewMode === "questoes"){
      //console.log('teste alternativas: ', alternativas);
      console.log('Criar questão: ', inputValue, ' dificuldade: ', dificuldade, ' assunto (parentId): ', parentId);
      
      let createdQuestao: Questao | null = null;
      const newQuestao: Omit<QuestaoCreate, "id"> = {
        texto: inputValue,
        dificuldade: dificuldade,
        assunto: parentId ? parentId : 0,
      }
      try{
        createdQuestao = await createQuestao(newQuestao as QuestaoCreate);
        console.log('Questão criada: ', createdQuestao);
      }catch(err){
        console.error("Erro ao criar questão:", err);
      }
      if(createdQuestao){
        console.log('Alternativas para criar: ', alternativas);
        // criar alternativas vinculadas à questão criada
        alternativas.forEach( async (alt: Omit<AlternativaCreate, "id">) => {
          console.log('Criar alternativa: ', alt);
          const newAlternativa: Omit<AlternativaCreate, "id"> = {
            texto: alt.texto,
            is_correct: alt.is_correct,
            questao: createdQuestao.id,
          };
          console.log('Nova alternativa para criar: ', newAlternativa);
          try{
            const createdAlt = await createAlternativa(newAlternativa as AlternativaCreate);
            console.log('Alternativa criada: ', createdAlt);
          }catch(err){
            console.error("Erro ao criar alternativa:", err);
          }
        });
      }
    }
  }
}

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
            handleSave();
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
        onSave={(lista) => {
          setAlternativas(lista)
        }}
      />
    </div>
  );
  }

