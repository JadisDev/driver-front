import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotAuthorized = () => {

    const redirect = () => {
        window.location.href = "/";
    }

    return (
        <span>Precisa fazer <Button onClick={() => redirect()}>Login</Button> para acessar a página</span>
    );

}

export default NotAuthorized;