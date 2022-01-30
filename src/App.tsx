import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Classes } from '@blueprintjs/core';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import SearchGamePage from './pages/SearchGamePage';
import TemplatePage from './pages/TemplatePage';
import GameTemplatesPage from './pages/GameTemplatesPage';
import MyTemplatesPage from './pages/MyTemplatesPage';
import MyPlaythroughsPage from './pages/MyPlaythroughsPage';
import MyPlaythroughPage from './pages/MyPlaythroughPage';
import MyTemplatePage from './pages/MyTemplatePage';

import './App.css';

function App() {
	return (
		<div className="dark-content-wrapper">
			<div className={Classes.DARK}>
				<Layout>
					<Switch>
						<Route path="/" exact component={HomePage} />
						<Route path="/login">
							<AuthPage isLogin={true} />
						</Route>
						<Route path="/signup">
							<AuthPage isLogin={false} />
						</Route>
						<Route path="/favorites" component={FavoritesPage} />
						<Route path="/guides/game/:gameId" component={GameTemplatesPage} />
						<Route path="/guides/:templateId" component={TemplatePage} />
						<Route path="/myguides/:templateId" component={MyTemplatePage} />
						<Route path="/myguides" component={MyTemplatesPage} />
						<Route path="/myplaythroughs/:playthroughId" component={MyPlaythroughPage} />
						<Route path="/myplaythroughs" component={MyPlaythroughsPage} />
						<Route path="/search/:searchTerm" component={SearchGamePage} />
						<Route path="/search" component={SearchGamePage} />
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
