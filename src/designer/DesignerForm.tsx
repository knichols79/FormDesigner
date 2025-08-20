import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { ComponentType, FormComponent } from "./FormComponent";
import Canvas from "./Canvas";
import MetaForm, { type MetaFormValues } from "./MetaForm";
import Palette from "./Pallette";
import EditFieldModal from "./EditFieldModal";


const toMachine = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, "-");

export default function FormDesigner() {
    const [meta, setMeta] = useState<MetaFormValues>({ title: "", name: "", apiPath: "" });
    const [components, setComponents] = useState<FormComponent[]>([]);
    const nextId = useRef(1);

    const [editId, setEditId] = useState<string | null>(null);
    const editing = components.find((c) => c.id === editId) ?? null;

    const addComponent = (type: ComponentType) => {
        if (type === "text") {
            const id = `c${nextId.current++}`;
            const label = "Name";
            const name = `${toMachine(label)}-${nextId.current - 1}`;
            setComponents((prev) => [
                ...prev,
                { id, type, label, name, placeholder: "Enter text..." },
            ]);
        }
    };

    const handleDuplicate = (id: string) => {
        const src = components.find((x) => x.id === id);
        if (!src) return;
        const newId = `c${nextId.current++}`;
        setComponents((prev) => [
            ...prev,
            { ...src, id: newId, name: `${src.name}-copy`, label: `${src.label} (copy)` },
        ]);
    };

    const handleDelete = (id: string) => {
        setComponents((prev) => prev.filter((x) => x.id !== id));
    };

    return (
        <Container fluid="xl" className="py-3">

            <MetaForm values={meta} onChange={setMeta} apiPrefix="https://yourapi.form.io/" />

            <Row>
                <Col md={3}>
                    <Palette
                        items={[
                            { type: "text", label: "Text Field", icon: "bi-input-cursor-text" },
                        ]}
                        onAdd={addComponent}
                    />
                </Col>

                <Col md={9}>
                    <Canvas
                        components={components}
                        onDropType={addComponent}
                        onEdit={(id) => setEditId(id)} 
                        onDuplicate={handleDuplicate}
                        onDelete={handleDelete}
                        minHeight="70vh"
                    />

                </Col>
            </Row>

            {editing && (
                <EditFieldModal
                    show={!!editing}
                    initial={{
                        label: editing.label,
                        name: editing.name,
                        placeholder: editing.placeholder,
                    }}
                    onCancel={() => setEditId(null)}
                    onSave={(vals) => {
                        setComponents((prev) =>
                            prev.map((c) => (c.id === editing.id ? { ...c, ...vals } : c))
                        );
                        setEditId(null);
                    }}
                />
            )}

        </Container>
    );
}
