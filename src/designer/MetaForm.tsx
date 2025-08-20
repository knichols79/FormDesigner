
import { Form, Row, Col, InputGroup } from "react-bootstrap";

export type MetaFormValues = {
    title: string;
    name: string;
    apiPath: string;
};

type MetaFormProps = {
    values: MetaFormValues;
    onChange: (v: MetaFormValues) => void;
    apiPrefix?: string; // optional prefix shown before apiPath input
};

export default function MetaForm({ values, onChange, apiPrefix }: MetaFormProps) {
    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        onChange({ ...values, [name]: value });
    };

    return (
        <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
            <Row>
                <Col md={4}>
                    <Form.Group controlId="metaTitle" className="text-start mb-3">
                        <Form.Label className="fw-semibold">
                            Title <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            name="title"
                            value={values.title}
                            placeholder="Enter the form title"
                            onChange={handle}
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group controlId="metaName" className="text-start mb-3">
                        <Form.Label className="fw-semibold">
                            Name <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                            name="name"
                            value={values.name}
                            placeholder="Enter the form machine name"
                            onChange={handle}
                        />
                    </Form.Group>
                </Col>

                <Col md={4}>
                    <Form.Group controlId="metaApiPath" className="text-start mb-3">
                        <Form.Label className="fw-semibold">
                            API Path <span className="text-danger">*</span>
                        </Form.Label>
                        {apiPrefix ? (
                            <InputGroup>
                                <InputGroup.Text>{apiPrefix}</InputGroup.Text>
                                <Form.Control
                                    name="apiPath"
                                    value={values.apiPath}
                                    placeholder="example"
                                    onChange={handle}
                                />
                            </InputGroup>
                        ) : (
                            <Form.Control
                                name="apiPath"
                                value={values.apiPath}
                                placeholder="example"
                                onChange={handle}
                            />
                        )}
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    );
}
