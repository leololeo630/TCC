type ListItemProps = {
    desc: string;
    disciplina?: string;
    assunto?: string;
    dificuldade?: string;
    onClick?: () => void;
}
export default function ListItem({ desc, disciplina, assunto, dificuldade, onClick }: ListItemProps) {
    return (
         <div className="flex flex-col justify-between border border-gray-300 rounded-lg p-4 shadow-sm w-full h-40"
         onClick={onClick}>
      {/* Top row com disciplina/assunto à esquerda e dificuldade à direita */}
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>
          {disciplina && assunto ? `${disciplina} - ${assunto}` : disciplina || assunto}
        </span>
        {dificuldade && <span>Nível - {dificuldade}</span>}
      </div>

      {/* Corpo com a descrição */}
      <div className="flex flex-1">
        <span className="text-gray-800 font-medium">{desc}</span>
      </div>
    </div>
    )
}