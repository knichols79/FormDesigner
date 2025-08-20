
import { useEffect, useState } from "react";
import { Modal, Form, Button, InputGroup } from "react-bootstrap";

export type EditFieldValues = {
    label: string;
    name: string;
    placeholder?: string;
};

type EditFieldModalProps = {
    show: boolean;
    initial: EditFieldValues;
    onCancel: () => void;
    onSave: (values: EditFieldValues) => void;
    title?: string;
};

const toMachine = (s: string) =>
    s.toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .replace(/\s+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function EditFieldModal({
    show,
    initial,
    onCancel,
    onSave,
    title = "Edit Text Field",
}: EditFieldModalProps) {
    const [label, setLabel] = useState(initial.label);
    const [name, setName] = useState(initial.name);
    const [placeholder, setPlaceholder] = useState(initial.placeholder ?? "");
    const [touchedName, setTouchedName] = useState(false);

    useEffect(() => {
        setLabel(initial.label);
        setName(initial.name);
        setPlaceholder(initial.placeholder ?? "");
        setTouchedName(false);
    }, [initial, show]);

    // Auto-generate machine name from label until user edits name manually
    useEffect(() => {
        if (!touchedName) setName(toMachine(label));
    }, [label, touchedName]);

    const isValidName = /^[a-z][a-z0-9-]*$/.test(name);
    const canSave = label.trim().length > 0 && isValidName;

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSave) return;
        onSave({
            label: label.trim(),
            name: name.trim(),
            placeholder: placeholder.trim() || undefined,
        });
    };

    return (
        <Modal show={show} onHide={onCancel} centered>
            <Form onSubmit={submit}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group controlId="edit-label" className="mb-3 text-start">
                        <Form.Label className="fw-semibold">Label</Form.Label>
                        <Form.Control
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Label shown to users"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="edit-name" className="mb-3 text-start">
                        <Form.Label className="fw-semibold">Name (machine)</Form.Label>
                        <InputGroup>
                            <Form.Control
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setTouchedName(true);
                                }}
                                isInvalid={!isValidName}
                                required
                                placeholder="e.g. first-name"
                            />
                            <Button
                                type="button"
                                variant="outline-secondary"
                                title="Generate from label"
                                onClick={() => {
                                    setName(toMachine(label));
                                    setTouchedName(true);
                                }}
                            >
                                <i className="bi bi-magic" />
                            </Button>
                            <Form.Control.Feedback type="invalid">
                                Use lowercase letters, numbers, and dashes; must start with a letter.
                            </Form.Control.Feedback>
                        </InputGroup>
                        <Form.Text className="text-muted">
                            This is the key used in your data object.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="edit-placeholder" className="mb-1 text-start">
                        <Form.Label className="fw-semibold">Placeholder</Form.Label>
                        <Form.Control
                            value={placeholder}
                            onChange={(e) => setPlaceholder(e.target.value)}
                            placeholder="Optional placeholder text"
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit" disabled={!canSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
