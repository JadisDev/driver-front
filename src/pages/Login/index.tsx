import React from "react";
import { Formik, Form } from "formik";
import FormTextField from "../../components/form/form-field";
import FormBootStrap from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useLogin from "../../hooks/login/useLogin";

const Login = () => {

    const { initialValues, handleSubmit, signupSchema} = useLogin();

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signupSchema}
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
