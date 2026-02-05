import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../../shared/lib/token';

export const LogoutButton: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        navigate('/login');
    };

    return (
        <Button type="primary" onClick={handleLogout}>
            Выход
        </Button>
    );
};
