import React, { useState, useEffect, useCallback } from 'react';
import jwt from 'jwt-decode';

import DecodedToken from '../api/models/DecodedToken';
import TokenData from '../api/models/TokenData';
import User from '../api/models/User';
import { apiRefresh } from '../api';

let logoutTimer: ReturnType<typeof setTimeout>;
const maxDuration = 3600000;

type initialContext = {
	token: string | null;
	isLoggedIn: boolean;
	login: (encodedToken: string) => void;
	logout: () => void;
	isRefreshNeeded: () => boolean
	user: User | null
}

const AuthContext = React.createContext<initialContext>({
	token: '',
	isLoggedIn: false,
	login: () => { },
	logout: () => { },
	isRefreshNeeded: () => false,
	user: {
		username: 'temp',
		email: 'temp'
	}
});

//Get remaining duration between now and when the token expires.
const calculateRemainingTime = (expirationTime: number): number => {
	const currentTime = new Date().getTime();
	const expirationTimeDate = new Date(expirationTime).getTime();

	const remainingDuration = expirationTimeDate - currentTime;

	return remainingDuration;
};

//Returns null if it can't get token from local storage.
//Returns null if it can get token from local storage but remaining time is less than 3600 miliseconds. 
//Otherwise return encoded token and duration.
const retrieveStoredTokenData = (): TokenData | null => {

	const storedToken = localStorage.getItem('token');
	const storedExpirationTime = localStorage.getItem('expirationTime');

	if (!storedToken || !storedExpirationTime) return null;

	const storedExpirationTimeAsNumber = parseInt(storedExpirationTime);

	const remainingTime = calculateRemainingTime(storedExpirationTimeAsNumber);

	if (remainingTime <= 3600) {
		localStorage.removeItem('token');
		localStorage.removeItem('expirationTime');
		return null;
	}

	return {
		encodedToken: storedToken,
		duration: remainingTime
	}

};

export const AuthContextProvider: React.FC = (props) => {

	const tokenData: TokenData | null = retrieveStoredTokenData();

	let initialToken: string | null = null;

	let initialUser: User | null = null;

	if (tokenData) {
		initialToken = tokenData.encodedToken; 

		const decodedToken: DecodedToken = jwt(initialToken);
		initialUser = { 
			email: decodedToken.username,
			username: decodedToken.userHandle
		}
	
	}

	const [user, setUser] = useState<null | User>(initialUser);

	const [token, setToken] = useState<null | string>(initialToken);

	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback((): void => {

		setToken(null);
		setUser(null);

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}

	}, []);

	const isRefreshNeeded = (): boolean => {

		const storedToken = localStorage.getItem('token');
		const storedExpirationTime = localStorage.getItem('expirationTime');

		if (!storedToken || !storedExpirationTime) return false;

		const storedExpirationTimeAsNumber = parseInt(storedExpirationTime);
		const remainingTime = calculateRemainingTime(storedExpirationTimeAsNumber);
		console.log('lets check to see if we need to refresh token')
		console.log('remainingTime ' + remainingTime);
		console.log('compared to ' + (maxDuration/2))
		if (remainingTime < (maxDuration/2) && remainingTime > 3600) {
			return true
		} 

		return false;
	}

	const loginHandler = (encodedToken: string): void => {

		setToken(encodedToken);

		const decodedToken: DecodedToken = jwt(encodedToken);

		let initialUser:User = {
			username: decodedToken.userHandle,
			email: decodedToken.username
		}

		setUser(initialUser);

		const expirationTime = new Date(decodedToken.exp * 1000).getTime();

		localStorage.setItem('token', encodedToken);

		localStorage.setItem('expirationTime', expirationTime.toString());

		const remainingTime: number = calculateRemainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, remainingTime);

	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		user: user,
		login: loginHandler,
		logout: logoutHandler,
		isRefreshNeeded
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);

};

export default AuthContext;