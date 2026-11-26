import { Filter, Plus, Search } from "lucide-react";

export function Toolbar({
  placeholder,
  button,
  onButtonClick,
  searchValue,
  onSearchChange,
  onSearch,
  onFilterClick,
}: {
  placeholder: string;
  button: string;
  onButtonClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearch?: () => void;
  onFilterClick?: () => void;
}) {
  const controlled = onSearchChange
    ? { value: searchValue ?? "", onChange: (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value) }
    : {};
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[200px]">
        <input
          placeholder={placeholder}
          onKeyDown={(e) => { if (e.key === "Enter") onSearch?.(); }}
          className="w-full rounded border border-border bg-input py-2 px-3 text-sm text-beige outline-none focus:border-gold"
          {...controlled}
        />
      </div>
      <button
        type="button"
        onClick={onSearch}
        aria-label="Buscar"
        className="flex items-center gap-2 rounded border border-border bg-secondary px-3 py-2 text-xs text-beige hover:border-gold"
      >
        <Search className="h-4 w-4" />
      </button>
      {onFilterClick && (
        <button
          type="button"
          onClick={onFilterClick}
          className="flex items-center gap-2 rounded border border-border bg-secondary px-3 py-2 text-xs text-beige hover:border-gold"
        >
          <Filter className="h-4 w-4" /> Filtros
        </button>
      )}
      <button onClick={onButtonClick} className="flex items-center gap-2 rounded bg-gold px-3 py-2 text-xs font-medium text-ink hover:bg-gold-soft">
        <Plus className="h-4 w-4" /> {button}
      </button>
    </div>
  );
}