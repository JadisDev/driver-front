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

import { useLocation } from 'react-router-dom';
import TableDriversInterface from "../../services/interface/Table/TableDriversInterface";

const SaveDriver = () => {

    const dispatch = useDispatch();
    const stock = useSelector((state: RootState) => state.loading);

    const location = useLocation();
    const driver: TableDriversInterface = location.state && location.state.driver;


    const initialValues = {
        id: driver ? driver.id : null,
        name: driver ? driver.name : "",
        document: driver ? driver.document : "",
        plate: driver ? driver.vehicle.plate : "",
        model: driver ? driver.vehicle.model : "",
    };

    async function postDriver(params: FormSaveDriverInterface) {
        try {
            dispatch(active());
            await api.post('/driver', params);
            dispatch(deactivate());
        } catch (error) {
            console.error(error);
            dispatch(deactivate());
        }
    }

    async function updateDriver(id: number, params: FormSaveDriverInterface) {
        try {
            dispatch(active());
            const response = await api.patch(`/driver/${id}`, { name: params.name, document: params.document });
            console.log(response);
            dispatch(deactivate());
        } catch (error) {
            console.error(error);
            dispatch(deactivate());
        }
    }

    const handleSubmit = async (params: FormSaveDriverInterface) => {
        if (driver && params.id) {
            return updateDriver(params.id, params);
        }
        await postDriver(params);
    };

    const driverSchema = Yup.object().shape({
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
                validationSchema={driverSchema}
            >
                <Form>
                    <FormBootStrap.Group
                        className="mb-3"
                        hidden
                    >
                        <FormTextField
                            name="id"
                            label=""
                            type="text"
                        />
                    </FormBootStrap.Group>
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

                    <FormBootStrap.Group
                        className="mb-3"
                        hidden={driver ? true : false}

                    >
                        <FormTextField
                            name="plate"
                            label="Placa do veículo"
                            type="text"
                        />
                    </FormBootStrap.Group>

                    <FormBootStrap.Group
                        className="mb-3"
                        hidden={driver ? true : false}
                    >
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
                        {driver ? 'Atualizar' : 'Cadastrar novo'} motorista
                    </Button>
                </Form>
            </Formik>
        </>
    );
};

export default SaveDriver;
