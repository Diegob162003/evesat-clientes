import { Eye, Pencil, Trash2 } from "lucide-react";

export function ActionIcons({
  onView,
  onEdit,
  onDelete,
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onView} disabled={!onView}
        className="text-beige/70 hover:text-gold disabled:pointer-events-none disabled:opacity-30">
        <Eye className="h-4 w-4" />
      </button>
      <button type="button" onClick={onEdit} disabled={!onEdit}
        className="text-beige/70 hover:text-gold disabled:pointer-events-none disabled:opacity-30">
        <Pencil className="h-4 w-4" />
      </button>
      <button type="button" onClick={onDelete} disabled={!onDelete}
        className="text-beige/70 hover:text-destructive disabled:pointer-events-none disabled:opacity-30">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}