import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useField, FieldAttributes } from "formik";

interface FormTextFieldProps extends FieldAttributes<any> {
  as?: React.ElementType;
  md?: number;
  controlId?: string;
  label: string;
  inputGroupPrepend?: React.ReactNode;
  name: string;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  as,
  md,
  controlId,
  label,
  inputGroupPrepend,
  ...props
}) => {
  const [field, meta] = useField(props);

  const isValid = !meta.error;
  const isInvalid = meta.touched && !isValid;

  return (
    <Form.Group as={as} md={md} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        {inputGroupPrepend}
        <Form.Control
          {...field}
          {...props}
          isValid={meta.touched && isValid}
          isInvalid={isInvalid}
        />

        <Form.Control.Feedback type="invalid">
          {meta.error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

FormTextField.defaultProps = {
  type: "text",
  inputGroupPrepend: null
};

export default FormTextField;
