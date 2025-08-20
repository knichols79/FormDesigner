
import { Form } from "react-bootstrap";
import type { ComponentType, FormComponent } from "./FormComponent";
import TextFieldBlock from "./fields/TextFieldBlock";

type CanvasProps = {
    components: FormComponent[];
    onDropType: (type: ComponentType) => void;
    onEdit: (id: string) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
    minHeight?: string | number;
};

export default function Canvas({
    components,
    onDropType,
    onEdit,
    onDuplicate,
    onDelete,
    minHeight = "70vh",
}: CanvasProps) {
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("application/x-form-component") as ComponentType;
        if (type) onDropType(type);
    };

    return (
        <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="border rounded bg-light p-3"
            style={{ minHeight, borderStyle: "dashed", borderWidth: 2 }}
        >
            {components.length === 0 ? (
                <div className="h-100 w-100 d-flex justify-content-center align-items-center text-muted">
                    Drag components here
                </div>
            ) : (
                <Form className="text-start">
                    {components.map((c) => {
                        if (c.type === "text") {
                            return (
                                <TextFieldBlock
                                    key={c.id}
                                    id={c.id}
                                    label={c.label}
                                    name={c.name}
                                    placeholder={c.placeholder}
                                    onEdit={onEdit}
                                    onDuplicate={onDuplicate}
                                    onDelete={onDelete}
                                />
                            );
                        }
                        return null;
                    })}
                </Form>
            )}
        </div>
    );
}
