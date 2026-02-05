import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { User } from '../../../entities/user/model/types';

interface UserModalProps {
    visible: boolean;
    user: User | null;
    onClose: () => void;
    onSubmit: (values: Partial<User>) => void;
    onDelete?: (id: string) => void;
    isLoading: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
    visible,
    user,
    onClose,
    onSubmit,
    onDelete,
    isLoading
}) => {
    const [form] = Form.useForm();
    const isEdit = !!user;

    useEffect(() => {
        if (visible && user) {
            form.setFieldsValue(user);
        } else {
            form.resetFields();
        }
    }, [visible, user, form]);

    const handleFinish = (values: any) => {
        onSubmit({ ...user, ...values });
    };

    return (
        <Modal
            title={isEdit ? "Редактирование пользователя" : "Создание пользователя"}
            visible={visible}
            onCancel={isLoading ? undefined : onClose}
            closable={!isLoading}
            maskClosable={!isLoading}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                {isEdit && (
                    <Form.Item label="id" name="id">
                        <Input disabled style={{ backgroundColor: '#f5f5f5', color: 'rgba(0, 0, 0, 0.25)' }} />
                    </Form.Item>
                )}

                <Form.Item
                    label="Имя"
                    name="name"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ссылка на аватарку"
                    name="avatar"
                    rules={[
                        { required: true, message: 'Введите ссылку' },
                        { type: 'url', message: 'Введите корректную ссылку' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
                    {isEdit && onDelete ? (
                        <Button type="primary" onClick={() => onDelete(user.id)} disabled={isLoading}>
                            Удалить
                        </Button>
                    ) : (
                        <div></div>
                    )}

                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                            {isEdit ? 'Сохранить' : 'Создать'}
                        </Button>
                        <Button type="primary" onClick={onClose} disabled={isLoading}>
                            Отмена
                        </Button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};
