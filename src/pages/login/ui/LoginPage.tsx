import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Layout } from 'antd';
import styled from 'styled-components';
import { LoginForm } from '../../../features/auth/ui/LoginForm';
import { getToken } from '../../../shared/lib/token';

const { Content } = Layout;

const StyledLayout = styled(Layout)`
    min-height: 100vh;
    justify-content: center;
    align-items: center;
`;

const StyledContent = styled(Content)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

const StyledCard = styled(Card)`
    width: 400px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const isAuth = !!getToken();

    useEffect(() => {
        if (isAuth) {
            navigate('/users');
        }
    }, [isAuth, navigate]);

    if (isAuth) {
        return null;
    }

    return (
        <StyledLayout>
            <StyledContent>
                <StyledCard>
                    <LoginForm />
                </StyledCard>
            </StyledContent>
        </StyledLayout>
    );
};
