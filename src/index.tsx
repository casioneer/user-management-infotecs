import React from 'react';
import ReactDOM from 'react-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { App } from './app/App';
import { LoginPage } from './pages/login/ui/LoginPage';
import { NotFoundPage } from './pages/not-found/ui/NotFoundPage';

import 'antd/dist/reset.css'; // or 'antd/dist/antd.css' for older versions, but v5 uses reset.css usually or built-in

const Root = () => (
    <App>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </App>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
