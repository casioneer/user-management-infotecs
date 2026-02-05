import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { LoginRequest } from '../../../shared/api/types';
import { setToken } from '../../../shared/lib/token';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();

    const { mutate, isLoading } = useMutation(
        (values: LoginRequest) => authApi.login(values),
        {
            onSuccess: (data) => {
                setToken(data.token);
                navigate('/users');
            },
            onError: (error: Error) => {
                api.error({
                    message: 'Ошибка авторизации',
                    description: error.message,
                });
            },
        }
    );

    const onFinish = (values: LoginRequest) => {
        mutate(values);
    };

    return (
        <>
            {contextHolder}
            <h2>Авторизация</h2>
            <Form
                name="login"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                disabled={isLoading}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Пожалуйста, введите логин!' }]}
                >
                    <Input placeholder="Логин" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                >
                    <Input.Password placeholder="Пароль" />
                </Form.Item>

                <Form.Item style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
