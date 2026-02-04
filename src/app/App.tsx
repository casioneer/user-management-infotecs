import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import { queryClient } from '../shared/api/query-client';

export const App = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider>
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </ConfigProvider>
            </QueryClientProvider>
        </React.StrictMode>
    );
};
