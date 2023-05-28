import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './layout-navbar.css'
import { Button } from 'react-bootstrap';

const NavBar = () => {

    const navigate = useNavigate();
    const login = localStorage.getItem('login');

    const logout = () => {
        localStorage.removeItem('login');
        navigate('/');
    }

    return (
        <nav className='navbar'>
            {login === '1' ?
                <ul className='list'>
                    <li className='item'>
                        <Link to="/drivers">Início</Link>
                    </li>
                    <li className='item'>
                        <Link to="/driver">Novo motorista</Link>
                    </li>
                    <li className='item text-default'>
                        <Button onClick={() => logout()}> Sair </Button>
                    </li>
                </ul>
                :
                <li className='item text-default'>
                    <span> Faça o login para continuar </span>
                </li>
            }
        </nav>
    )

}

export default NavBar;

