import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export type TextFieldBlockProps = {
    id: string;
    label: string;
    name: string;
    placeholder?: string;
    onEdit: (id: string) => void;
    onDuplicate: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TextFieldBlock({
    id,
    label,
    name,
    placeholder,
    onEdit,
    onDuplicate,
    onDelete,
}: TextFieldBlockProps) {
    return (
        <div className="form-block mb-3 p-2 rounded">
            {/* Hover actions */}
            <div className="block-actions d-flex gap-2">
                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Settings</Tooltip>}
                    trigger={["hover"]}
                    container={document.body}
                    transition={false}   
                    popperConfig={{
                        strategy: "fixed",
                       
                        modifiers: [
                            { name: "flip", enabled: false },
                            { name: "preventOverflow", options: { boundary: "viewport" } },
                        ],
                    }}
                >
                    <Button
                        size="sm"
                        variant="dark"
                        className="shadow-sm"
                        onClick={() => onEdit(id)}
                        aria-label="Edit"
                        title="Edit"
                    >
                        <i className="bi bi-gear"></i>
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id={`tt-edit-${id}`}>Settings</Tooltip>}
                    trigger={["hover"]}
                    container={document.body}
                    transition={false}   
                    popperConfig={{
                        strategy: "fixed",
                        modifiers: [
                            { name: "flip", enabled: false },
                            { name: "preventOverflow", options: { boundary: "viewport" } },
                        ],
                    }}
                >
                    <Button
                        size="sm"
                        variant="outline-secondary"
                        className="shadow-sm"
                        onClick={() => onDuplicate(id)}
                        aria-label="Duplicate"
                        title="Duplicate"
                    >
                        <i className="bi bi-files"></i>
                    </Button>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip>Delete</Tooltip>}
                    trigger={["hover"]}
                    container={document.body}
                    transition={false}   
                    popperConfig={{
                        strategy: "fixed",
                        modifiers: [
                            { name: "flip", enabled: false },
                            { name: "preventOverflow", options: { boundary: "viewport" } },
                        ],
                    }}
                >
                    <Button
                        size="sm"
                        variant="danger"
                        className="shadow-sm"
                        onClick={() => onDelete(id)}
                        aria-label="Delete"
                        title="Delete"
                    >
                        <i className="bi bi-x-lg"></i>
                    </Button>
                </OverlayTrigger>
            </div>

            {/* The actual field */}
            <Form.Group controlId={id} className="mb-0 text-start">
                <Form.Label className="fw-semibold">{label}</Form.Label>
                <Form.Control type="text" name={name} placeholder={placeholder} />
            </Form.Group>
        </div>
    );
}
