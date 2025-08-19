import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";

export default function CustomFormBuilder() {
    const [formData, setFormData] = useState({
        title: "",
        name: "",
        apiPath: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    return (
        <Container fluid className="p-4">
            <Form onSubmit={handleSubmit}>
                {/* Top Row: Title, Name, API Path */}
                <Row className="mb-3 align-items-center">
                    <Col md={4}>
                        <Form.Group controlId="formTitle" className="text-start">
                            <Form.Label className="fw-semibold">
                                Title <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the form title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formName" className="text-start">
                            <Form.Label className="fw-semibold">
                                Name <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter the form machine name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="formApiPath" className="text-start">
                            <Form.Label className="fw-semibold">
                                API Path <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>https://yourapi.form.io/</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="example"
                                    name="apiPath"
                                    value={formData.apiPath}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    {/* Left Sidebar */}
                    <Col md={3}>
                        <h6 className="fw-bold mb-2">Basic</h6>
                        <div className="d-grid gap-2">
                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-input-cursor-text me-2"></i>
                                Text Field
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-textarea-t me-2"></i>
                                Text Area
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-123 me-2"></i>
                                Number
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-key me-2"></i>
                                Password
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-check-square me-2"></i>
                                Checkbox
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-list-check me-2"></i>
                                Select Boxes
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-caret-down-square me-2"></i>
                                Select
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-record-circle me-2"></i>
                                Radio
                            </Button>

                            <Button variant="outline-success" size="sm" className="d-flex align-items-center justify-content-start">
                                <i className="bi bi-square me-2"></i>
                                Button
                            </Button>

                        </div>
                    </Col>

                    {/* Right Canvas */}
                    <Col md={9}>
                        <div
                            className="border bg-light d-flex align-items-center justify-content-center"
                            style={{ height: "300px" }}
                        >
                            Drag and Drop a form component
                        </div>
                        <div className="mt-3 text-start">
                            <Button type="submit" variant="success">
                                Submit
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
