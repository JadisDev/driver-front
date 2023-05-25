import React from "react";
import { Formik, Form } from "formik";
import FormTextField from "../../components/form/form-field";
import FormBootStrap from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

const Login = () => {
    const initialValues = {
        login: "",
        password: "",
    };

    const handleSubmit = (values: any) => {
        alert(JSON.stringify(values));
    };

    const SignupSchema = Yup.object().shape({
        login: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
        password: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
        >
            <Form>
                <FormBootStrap.Group className="mb-3">
                    <FormTextField
                        name="login"
                        label="Login"
                        type="text"
                    />
                </FormBootStrap.Group>

                <FormBootStrap.Group className="mb-3">
                    <FormTextField
                        name="password"
                        label="Senha"
                        type="password"
                    />
                </FormBootStrap.Group>

                <Button
                    variant="primary"
                    type="submit"
                >
                    Login
                </Button>
            </Form>
        </Formik>
    );
};

export default Login;
