import React from 'react';
import { Layout, List, Button, Avatar, Spin, Typography } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { User } from '../../../entities/user/model/types';
import { userApi } from '../../../entities/user/api/userApi';
import { LogoutButton } from '../../../features/auth/ui/LogoutButton';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../shared/lib/token';
import { UserModal } from '../../../features/user-management/ui/UserModal';

const { Content, Header } = Layout;
const { Text } = Typography;

export const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    React.useEffect(() => {
        if (!getToken()) {
            navigate('/login');
        }
    }, [navigate]);

    const { data: users, isLoading } = useQuery(['users'], userApi.getUsers);

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [editingUser, setEditingUser] = React.useState<User | null>(null);

    const deleteMutation = useMutation(userApi.deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        }
    });

    const createMutation = useMutation(userApi.addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            closeModal();
        }
    });

    const updateMutation = useMutation(userApi.updateUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
            closeModal();
        }
    });

    const openCreateModal = () => {
        setEditingUser(null);
        setIsModalVisible(true);
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setEditingUser(null);
    };

    const handleFormSubmit = (values: Partial<User>) => {
        if (editingUser) {
            updateMutation.mutate(values as User);
        } else {
            createMutation.mutate(values as Omit<User, 'id' | 'createdAt'>);
        }
    };

    const handleDeleteFromModal = (id: string) => {
        deleteMutation.mutate(id);
        closeModal();
    };

    return (
        <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            <Header style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                background: '#fff',
                padding: '0 50px',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <LogoutButton />
            </Header>
            <Content style={{ padding: '50px' }}>
                <div style={{
                    background: '#fff',
                    padding: '24px',
                    minHeight: 400,
                    borderRadius: '8px'
                }}>
                    {isLoading ? (
                        <div style={{ textAlign: 'center', padding: '50px' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            <List
                                dataSource={users}
                                renderItem={(user: User) => (
                                    <List.Item
                                        style={{
                                            cursor: 'pointer',
                                            padding: '16px 0',
                                            borderBottom: '1px solid #f0f0f0'
                                        }}
                                        onClick={() => openEditModal(user)}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar
                                                    src={user.avatar}
                                                    size={48}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={(e?: React.MouseEvent<HTMLElement>) => {
                                                        e?.stopPropagation();
                                                        openEditModal(user);
                                                    }}
                                                />
                                            }
                                            title={<Text strong style={{ fontSize: '16px' }}>{user.name}</Text>}
                                            description={
                                                <Text type="secondary">
                                                    Зарегистрирован {dayjs(user.createdAt).format('DD.MM.YYYY')}
                                                </Text>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                            <div style={{ marginTop: '24px' }}>
                                <Button type="primary" onClick={openCreateModal}>
                                    Создать пользователя
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </Content>

            <UserModal
                visible={isModalVisible}
                user={editingUser}
                onClose={closeModal}
                onSubmit={handleFormSubmit}
                onDelete={handleDeleteFromModal}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />
        </Layout>
    );
};
