import React from "react";

import { Formik, Form } from "formik";
import FormTextField from "../../components/form/form-field";
import FormBootStrap from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from "../../components/layout/layout-loading";
import AlertApp from "../../components/alert/AlertApp";
import useSaveDriver from "../../hooks/driver/useSaveDriver";

const SaveDriver = () => {

    const { stock, showAlertApp, alertApp, initialValues, handleSubmit, driverSchema, driver } = useSaveDriver()

    return (
        <>
            <div>
                {stock.loading && <Loading message="Aguarde..." />}
            </div>

            {showAlertApp &&
                <AlertApp
                    message={alertApp.message}
                    variant={alertApp.variant}
                />
            }

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
