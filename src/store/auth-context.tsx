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

const calculateRemainingTime = (expirationTime: number): number => {
    const currentTime = new Date().getTime();
    const expirationTimeDate = new Date(expirationTime).getTime();

    const remainingDuration = expirationTimeDate - currentTime;

    return remainingDuration;
};

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

        console.log('in loginHandler');

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
            console.log(tokenData.duration);
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