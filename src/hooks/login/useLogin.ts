import React from "react";

import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const useLogin = () => {

    const navigate = useNavigate();

    const initialValues = {
        login: "",
        password: "",
    };

    const handleSubmit = () => {
        localStorage.setItem('login', '1');
        navigate('/drivers');
    };

    const signupSchema = Yup.object().shape({
        login: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
        password: Yup.string()
            .min(3, 'Muito curto!')
            .required('Requerido'),
    });

    return { initialValues, handleSubmit, signupSchema }    

}

export default useLogin;