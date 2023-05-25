import React from "react";
import { Formik, Form } from "formik";
import FormTextField from "../../components/form/form-field";
import FormBootStrap from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../../store";
import { login } from '../../store/Stock/Stock.store';

const Login = () => {

    const dispatch = useDispatch();
    const stock = useSelector((state: RootState) => state.stock);

    const initialValues = {
        login: "",
        password: "",
    };

    const handleSubmit = () => {
        dispatch(login());
    };

    const SignupSchema = Yup.object().shape({
        login: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
        password: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
    });

    console.log(stock)

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
