import React, { useState, useEffect, useCallback } from 'react';
import jwt from 'jwt-decode';

import DecodedToken from '../models/decodedToken';
import TokenData from '../models/tokenData';

let logoutTimer: ReturnType<typeof setTimeout>;

type initialContext = {
    token: string|null;
    isLoggedIn: boolean;
    login: (encodedToken: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<initialContext>({
    token: '',
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
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
    let storedExpirationTime = localStorage.getItem('expirationTime');

    if (!storedToken || !storedExpirationTime) return null;
    
    const storedExpirationTimeAsNumber = parseInt(storedExpirationTime);

    const remainingTime = calculateRemainingTime(storedExpirationTimeAsNumber);

    if (remainingTime <= 3600) {
        localStorage.remoteItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }

    return {
        encodedToken: storedToken,
        duration: remainingTime
    }
    
};

export const AuthContextProvider: React.FC = (props) => {
    
    const tokenData: TokenData|null = retrieveStoredTokenData();

    let initialToken: string|null = null;

    if (tokenData) initialToken = tokenData.encodedToken;

    const [token, setToken] = useState<null|string>(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback((): void => {

        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }

    }, []);

    const loginHandler = (encodedToken: string): void => {

        setToken(encodedToken);

        const decodedToken: DecodedToken = jwt(encodedToken);

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
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
          {props.children}
        </AuthContext.Provider>
      );

};

export default AuthContext;