type AddItemProps = {
    title: string;
}

export default function EditPanel({ title }: AddItemProps) {
    return (
        <div className="flex items-center justify-between border border-dashed border-gray-400 rounded-lg p-4 shadow-sm bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
            <span className="text-gray-600 font-medium">Adicionar novo item</span>
            <button className="text-blue-600 hover:text-blue-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    )
}