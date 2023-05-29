import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AlertAppInterfaceInterface from "../../services/interface/alert/AlertAppInterfaceInterface";
import FormSaveDriverInterface from "../../services/interface/forms/FormSaveDriverInterface";
import TableDriversInterface from "../../services/interface/Table/TableDriversInterface";
import { RootState } from "../../store";
import { active, deactivate } from "../../store/Loading/Loading.store";
import api from '../../services/api';
import * as Yup from 'yup';

const useSaveDriver = () => {

    const dispatch = useDispatch();
    const stock = useSelector((state: RootState) => state.loading);

    const [showAlertApp, setShowAlertApp] = useState<boolean>(false);
    const [alertApp, setAlertApp] = useState<AlertAppInterfaceInterface>({
        message: '',
        variant: 'dark'
    });

    const location = useLocation();
    const driver: TableDriversInterface | null = location.state && location.state.driver;

    const initialValues = {
        id: driver ? driver.id : null,
        name: driver ? driver.name : "",
        document: driver ? driver.document : "",
        plate: driver ? driver.vehicle.plate : "",
        model: driver ? driver.vehicle.model : "",
    };

    const handleAlertApp = (props: AlertAppInterfaceInterface) => {
        setShowAlertApp(true);
        setAlertApp(props);
    }

    async function postDriver(params: FormSaveDriverInterface) {
        try {
            dispatch(active());
            await api.post('/driver', params);
            dispatch(deactivate());
            handleAlertApp({
                message: 'Salvo com sucesso!',
                variant: 'success'
            });
        } catch (error) {
            dispatch(deactivate());
            handleAlertApp({
                message: 'Erro ao cadastrar um motorista',
                variant: 'danger'
            });
        }
    }

    async function updateDriver(id: number, params: FormSaveDriverInterface) {
        try {
            dispatch(active());
            await api.patch(`/driver/${id}`, { name: params.name, document: params.document });
            dispatch(deactivate());
            handleAlertApp({
                message: 'Atualizado com sucesso!',
                variant: 'success'
            });
        } catch (error) {
            dispatch(deactivate());
            handleAlertApp({
                message: 'Erro ao atualizar',
                variant: 'danger'
            });
        }
    }

    const handleSubmit = async (params: FormSaveDriverInterface) => {
        if (driver && params.id) {
            return await updateDriver(params.id, params);
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

    return { stock, alertApp, initialValues, handleSubmit, driverSchema, showAlertApp, driver }

}

export default useSaveDriver;