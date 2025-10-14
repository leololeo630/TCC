import { Edit } from "lucide-react";

type ListItemProps = {
    title: string;
    onEdit?: () => void;
}
export default function ListItem({ title, onEdit }: ListItemProps) {
    return (
        <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4 shadow-sm">
            <span className="text-gray-800 font-medium">{title}</span>
            <button onClick={ onEdit } className="text-blue-600 hover:text-blue-800">
                <Edit size={20} />
            </button>
        </div>
    )
}