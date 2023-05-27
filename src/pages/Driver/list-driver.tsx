import React, { useEffect, useState } from 'react';

import DataTable, { TableColumn } from 'react-data-table-component';
import api from '../../services/api';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import ResponseDriversInterface from '../../services/interface/response/ResponseDriversInterface';
import DriverInterface from '../../services/interface/model/DriverInterface';
import FormSearchDriverInterface from '../../services/interface/forms/FormSearchDriverInterface';
import TableDriversInterface from '../../services/interface/Table/TableDriversInterface';
import { Formik, Form } from "formik";
import FormBootStrap from 'react-bootstrap/Form';
import FormTextField from "../../components/form/form-field";
import Button from 'react-bootstrap/Button';

const columns: TableColumn<TableDriversInterface>[] = [
    {
        name: 'Motorista',
        selector: row => row.name || '',
    },
    {
        name: 'Documento',
        selector: row => row.document || '',
    },
    {
        name: 'Placa',
        selector: row => row.vehicle ? row.vehicle.plate : '',
    },
];

function ListDrivers(): JSX.Element {

    const initialValues = {
        search: "",
    };

    async function searchDriverByNameDocumentPlate(params: FormSearchDriverInterface) {
        try {
            setIsLoading(true);
            const response: AxiosResponse<ResponseDriversInterface> = await api.get(`/driver/name-document-plate/${params.search}`);
            setDrives(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    const handleSubmit = async (params: FormSearchDriverInterface) => {
        await searchDriverByNameDocumentPlate(params);
    };

    const searchSchema = Yup.object().shape({
        search: Yup.string()
            .min(1, 'Muito curto!')
            .required('Requerido'),
    });

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [drives, setDrives] = useState<DriverInterface[] | undefined | null>();

    const clearSearch = async (resetForm: () => void) => {
        await getDrivers();
        resetForm();
    }

    async function getDrivers() {
        try {
            const response: AxiosResponse<ResponseDriversInterface> = await api.get('/driver');
            setDrives(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        const loadDrives = async () => {
            await getDrivers()
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
                            disabled={isLoading}
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