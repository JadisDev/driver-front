import React from "react";
import { Formik, Form } from "formik";
import FormTextField from "../../components/form/form-field";
import FormBootStrap from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as Yup from 'yup';

import api from '../../services/api';
import FormSaveDriverInterface from "../../services/interface/forms/FormSaveDriverInterface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import Loading from "../../components/layout/layout-loading";
import { active, deactivate } from "../../store/Loading/Loading.store";

const SaveDriver = () => {

    const dispatch = useDispatch();
    const stock = useSelector((state: RootState) => state.loading);

    const initialValues = {
        name: "111",
        document: "2222",
        plate: "3333",
        model: "4444",
    };

    async function postDriver(params: FormSaveDriverInterface) {
        try {
            dispatch(active());
            const response = await api.post('/driver', params);
            dispatch(deactivate());
        } catch (error) {
            console.error(error);
            dispatch(deactivate());
        }
    }

    const handleSubmit = async (params: FormSaveDriverInterface) => {
        await postDriver(params);
    };

    const signupSchema = Yup.object().shape({
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
        <>
            <div>
                {stock.loading && <Loading message="Aguarde..." />}
            </div>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={signupSchema}
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
                        disabled={stock.loading}
                        variant="primary"
                        type="submit"
                    >
                        Cadastrar novo motorista/veículo
                    </Button>
                </Form>
            </Formik>
        </>
    );
};

export default SaveDriver;
