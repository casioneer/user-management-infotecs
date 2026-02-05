import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout } from 'antd';
import { LoginForm } from '../../../features/auth/ui/LoginForm';
import { getToken } from '../../../shared/lib/token';

const { Content } = Layout;

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const isAuth = !!getToken();

    useEffect(() => {
        if (isAuth) {
            navigate('/users');
        }
    }, [isAuth, navigate]);

    if (isAuth) {
        return null; // or spinner
    }

    return (
        <Layout style={{ minHeight: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Card style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <LoginForm />
                </Card>
            </Content>
        </Layout>
    );
};
