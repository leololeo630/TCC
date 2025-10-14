import ListItem from "../components/admin/ListItem"

export default function Historico() {
    const items = [
        { id: 1, desc: "Prova de Matemática", disciplina: "Matemática", assunto: "Álgebra", dificuldade: "Médio" },
        { id: 2, desc: "Prova de Português", disciplina: "Português", assunto: "Gramática", dificuldade: "Fácil" },
        { id: 3, desc: "Prova de Redação", disciplina: "Redação", assunto: "Argumentação", dificuldade: "Difícil" },
    ];
    return(
    <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="bg-blue-600 text-white w-full p-4 flex justify-between items-center">
            <div className="font-semibold">User</div>
            <div className="text-lg font-bold">Vestibular</div>
            <div className="w-20" /> {/* espaçamento p/ alinhar */}
        </nav>

        <main className="flex flex-1 justify-center items-start pt-12">
            <div className="flex flex-col gap-4 w-full">
                {filteredItems.map((item) => (
                    <ListItem key={item.id} desc={item.desc} disciplina={item.disciplina} assunto={item.assunto} dificuldade={item.dificuldade}/>
                ))}
            </div>
        </main>
    </div>
    )
}