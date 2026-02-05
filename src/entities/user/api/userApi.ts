import { api } from '../../../shared/api/api';
import { User } from '../model/types';

export const userApi = {
    getUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await api.delete(`/users/${id}`);
    },

    addUser: async (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
        const response = await api.post<User>('/users', user);
        return response.data;
    },

    updateUser: async (user: User): Promise<User> => {
        const response = await api.put<User>(`/users/${user.id}`, user);
        return response.data;
    }
};
