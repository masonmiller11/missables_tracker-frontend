import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Classes } from '@blueprintjs/core';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
    return (
        <div className="dark-content-wrapper">
            <div className={Classes.DARK}>
                <Layout>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        <Route path="/login">
                            <AuthPage isLogin={true}/>
                        </Route>
                        <Route path="/signup">
                            <AuthPage isLogin={false}/>
                        </Route>
                        <Route path="/favorites">
                            <FavoritesPage />
                        </Route>
                        <Route path="*">
                            <Redirect to="/" />
                        </Route>
                    </Switch>
                </Layout>
            </div>
        </div>
    );
}

export default App;
