import { LoginRequest, LoginResponse } from './types';

export const authApi = {
    login: (data: LoginRequest): Promise<LoginResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.username === 'admin' && data.password === 'admin') {
                    resolve({ token: 'mock_token_' + Math.random() });
                } else {
                    reject(new Error('Неверный логин или пароль'));
                }
            }, 2000);
        });
    }
};
