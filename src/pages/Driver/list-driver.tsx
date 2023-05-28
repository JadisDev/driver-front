import React, { useEffect, useState } from 'react';

import DataTable from 'react-data-table-component';
import { Formik, Form } from "formik";
import FormBootStrap from 'react-bootstrap/Form';
import FormTextField from "../../components/form/form-field";
import Button from 'react-bootstrap/Button';
import 'react-confirm-alert/src/react-confirm-alert.css';
import useListDriver from '../../hooks/driver/useListDriver';

function ListDrivers(): JSX.Element {

    const {
        getDrivers,
        drives,
        isLoading,
        columns,
        initialValues,
        handleSubmit,
        searchSchema,
        clearSearch,
    } = useListDriver();

    useEffect(() => {
        const loadDrives = async () => {
            await getDrivers();
        };
        loadDrives();
    }, []);

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={searchSchema}
            >
                {({ resetForm }) => (
                    <Form>
                        <FormBootStrap.Group className="mb-3">
                            <FormTextField
                                name="search"
                                label="Pesquise por: nome ou documento ou placa"
                                type="text"
                            />
                        </FormBootStrap.Group>
                        <Button
                            disabled={isLoading}
                            variant="primary"
                            type="submit"
                        >
                            Pesquisar
                        </Button>
                        <Button
                            style={{ marginLeft: '5px' }}
                            disabled={(isLoading)}
                            variant="secondary"
                            type="button"
                            onClick={() => clearSearch(resetForm)}
                        >
                            Limpar
                        </Button>
                    </Form>
                )}

            </Formik>

            <DataTable
                columns={columns}
                data={drives ? drives : []}
                progressPending={isLoading}
                pagination
            />
        </>
    );
}

export default ListDrivers;