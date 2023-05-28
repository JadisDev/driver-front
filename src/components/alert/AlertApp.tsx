import React, { useEffect, useState } from 'react';

import Alert from 'react-bootstrap/Alert';
import AlertAppInterfaceInterface from '../../services/interface/alert/AlertAppInterfaceInterface';

function AlertApp(props: AlertAppInterfaceInterface) {
    const [show, setShow] = useState(true);
    const time = 5;

    const { message, variant } = props;

    useEffect(
        () => {
            setTimeout(() => setShow(false), time * 1000);
        }, []
    );

    return (
        <>
            <Alert show={show} variant={variant}>
                <p>
                    {message}
                </p>
            </Alert>
        </>
    );
}

export default AlertApp;