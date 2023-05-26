import React from 'react';
import LoadingProps from '../../services/interface/LoadingInterface';
import './layout-loading.css'

const Loading: React.FC<LoadingProps> = ({ message }) => {
    return (
        <div className="loading">
            <h2>{message || 'Carregando...'}</h2>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default Loading;