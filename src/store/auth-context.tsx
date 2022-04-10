import React, { useState, useEffect, useCallback } from 'react';
import jwt from 'jwt-decode';

import DecodedToken from '../api/models/DecodedToken';
import TokenData from '../api/models/TokenData';
import User from '../api/models/User';
import { apiRefresh } from '../api';

let logoutTimer: ReturnType<typeof setTimeout>;

//This is manually added and should match what we have set in the backend. 
//This time is in milliseconds. The backend setting is in seconds.
//We should include this in the token header and pull it in to set it automatically.
const maxDuration = 86400000;

type initialContext = {
	isLoggedIn: boolean;
	login: (encodedToken: string) => void;
	logout: () => void;
	isRefreshNeeded: () => boolean
	user: User | null
}

const AuthContext = React.createContext<initialContext>({
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
		console.log("REMAINING TIME" + remainingTime);
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

		console.log("Logging out!");
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
		
		//remainingTime is in Milliseconds.
		const remainingTime = calculateRemainingTime(storedExpirationTimeAsNumber);
		console.log('Lets check to see if we need to refresh token.')
		console.log('Remaining time: ' + remainingTime);
		console.log('Compared to: ' + (maxDuration/2))
		if (remainingTime < maxDuration/2 && remainingTime > 3600) {
			console.log('refresh needed!');
			return true;
		} 
		console.log('refresh not needed');
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
		console.log("In auth-context useEffect, token data has changed!");
		if (tokenData) {
			logoutTimer && clearTimeout(logoutTimer);
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