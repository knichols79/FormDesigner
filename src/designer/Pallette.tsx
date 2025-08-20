
import { Button } from "react-bootstrap";
import type { ComponentType } from "./FormComponent";

export const DND_MIME = "application/x-form-component";

type PaletteItem = { type: ComponentType; label: string; icon: string };

type PaletteProps = {
    title?: string;
    items?: PaletteItem[];
    /** Optional: add on double-click (nice for quick add without drag) */
    onAdd?: (type: ComponentType) => void;
};

const DEFAULT_ITEMS: PaletteItem[] = [
    { type: "text", label: "Text Field", icon: "bi-input-cursor-text" },
];

export default function Palette({ title = "Basic", items = DEFAULT_ITEMS, onAdd }: PaletteProps) {
    const handleDragStart = (e: React.DragEvent, type: ComponentType) => {
        e.dataTransfer.setData(DND_MIME, type);
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <>
            <h6 className="fw-bold mb-2">{title}</h6>
            <div className="d-grid gap-2">
                {items.map((it) => (
                    <Button
                        key={it.label}
                        variant="outline-success"
                        size="sm"
                        draggable
                        onDragStart={(e) => handleDragStart(e, it.type)}
                        onDoubleClick={() => onAdd?.(it.type)}
                        className="d-flex align-items-center justify-content-start"
                        title="Drag into the canvas (double-click to add)"
                    >
                        <i className={`bi ${it.icon} me-2`} />
                        {it.label}
                    </Button>
                ))}
            </div>
        </>
    );
}
