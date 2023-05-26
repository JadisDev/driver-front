import React from "react";
import { Formik, Form } from "formik";
import FormTextField from "../../components/form/form-field";
import FormBootStrap from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

const Driver = () => {

    type FormDriver = {
        name: string,
        document: string,
        plate: string,
        model: string,
    }

    const initialValues = {
        name: "",
        document: "",
        plate: "",
        model: "",
    };

    const handleSubmit = (value:FormDriver) => {
        alert(JSON.stringify(value));
    };

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
        document: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
        plate: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
        model: Yup.string()
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
                        name="name"
                        label="Nome"
                        type="text"
                    />
                </FormBootStrap.Group>

                <FormBootStrap.Group className="mb-3">
                    <FormTextField
                        name="document"
                        label="Documento"
                        type="text"
                    />
                </FormBootStrap.Group>

                <FormBootStrap.Group className="mb-3">
                    <FormTextField
                        name="plate"
                        label="Placa do veículo"
                        type="text"
                    />
                </FormBootStrap.Group>

                <FormBootStrap.Group className="mb-3">
                    <FormTextField
                        name="model"
                        label="Modelo do veículo"
                        type="text"
                    />
                </FormBootStrap.Group>

                <Button
                    variant="primary"
                    type="submit"
                >
                    Cadastrar novo motorista/veículo
                </Button>
            </Form>
        </Formik>
    );
};

export default Driver;
