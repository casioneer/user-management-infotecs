import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
    <React.StrictMode>
        <h1>App works (React 16)</h1>
    </React.StrictMode>
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
