import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import DriverInterface from "../../services/interface/model/DriverInterface";
import api from '../../services/api';
import { AxiosResponse } from "axios";
import ResponseDriversInterface from "../../services/interface/response/ResponseDriversInterface";
import AlertAppInterfaceInterface from "../../services/interface/alert/AlertAppInterfaceInterface";
import { TableColumn } from "react-data-table-component";
import TableDriversInterface from "../../services/interface/Table/TableDriversInterface";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import AlertApp from "../../components/alert/AlertApp";
import * as Yup from 'yup';
import FormSearchDriverInterface from "../../services/interface/forms/FormSearchDriverInterface";

const useListDriver = () => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [drives, setDrives] = useState<DriverInterface[] | undefined | null>();
    const [showAlertApp, setShowAlertApp] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleAlertApp = (props: AlertAppInterfaceInterface) => {
        setShowAlertApp(true);
        return (
            <AlertApp
                message={props.message}
                variant={props.variant}
            />
        )
    }

    async function deleteDriver(driverId: number) {
        try {
            setIsLoading(true);
            await api.delete(`/driver/${driverId}`);
            getDrivers();
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleAlertApp({
                message: 'Erro ao deletar motoristas',
                variant: 'danger'
            });
        }
    }

    async function getDrivers() {
        try {
            const response: AxiosResponse<ResponseDriversInterface> = await api.get('/driver');
            setDrives(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleAlertApp({
                message: 'Erro ao consultar motoristas',
                variant: 'danger'
            });
        }
    }

    const handleButtonClickUpdate = (row: TableDriversInterface) => {
        navigate('/driver', { state: { driver: row } });
    }

    const handleButtonClickDelete = (row: TableDriversInterface) => {
        confirmAlert({
            title: 'Deseja continuar?',
            message: 'Ação não pode ser desfeita.',
            buttons: [
                {
                    label: 'Confirmo!',
                    onClick: () => deleteDriver(row.id)
                },
                {
                    label: 'Voltar',
                    onClick: () => { }
                }
            ]
        });
    };

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
        {
            name: 'Deletar',
            cell: (row) =>
                <Button
                    onClick={() => handleButtonClickDelete(row)}
                    variant="danger"
                >
                    Deletar
                </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        {
            name: 'Editar',
            cell: (row) =>
                <Button
                    onClick={() => handleButtonClickUpdate(row)}
                    variant="warning"
                >
                    Editar
                </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    const initialValues = {
        search: "",
    };

    const searchSchema = Yup.object().shape({
        search: Yup.string()
            .min(1, 'Muito curto!')
            .required('Requerido'),
    });


    async function searchDriverByNameDocumentPlate(params: FormSearchDriverInterface) {
        try {
            setIsLoading(true);
            const response: AxiosResponse<ResponseDriversInterface> = await api.get(`/driver/name-document-plate/${params.search}`);
            setDrives(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            handleAlertApp({
                message: 'Erro ao filtrar motoristas',
                variant: 'danger'
            });
        }
    }

    const clearSearch = async (resetForm: () => void) => {
        await getDrivers();
        resetForm();
    }

    const handleSubmit = async (params: FormSearchDriverInterface) => {
        await searchDriverByNameDocumentPlate(params);
    };

    return {
        getDrivers,
        showAlertApp,
        isLoading,
        columns,
        drives,
        setDrives,
        initialValues,
        handleSubmit,
        searchSchema,
        clearSearch,
    };

}

export default useListDriver;
