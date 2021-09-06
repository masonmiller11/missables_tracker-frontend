import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import '@blueprintjs/core/lib/css/blueprint.css';

import { AuthContextProvider } from './store/auth-context';
import { GameContextProvider } from './store/game-context';

ReactDOM.render(
    <React.StrictMode>
        <GameContextProvider>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </AuthContextProvider>
        </GameContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
