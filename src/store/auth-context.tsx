import React, { useState, useEffect, useCallback } from 'react';

let logoutTimer: ReturnType<typeof setTimeout>;

type TokenData = {
    token: string;
    duration: number;
};

type initialContext = {
    token: string|null;
    isLoggedIn: boolean;
    login: (token: string, expirationTime: number) => void;
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
        token: storedToken,
        duration: remainingTime
    }
    
};

export const AuthContextProvider: React.FC = (props) => {
    
    const tokenData: TokenData|null = retrieveStoredTokenData();

    let initialToken: string|null = null;

    if (tokenData) initialToken = tokenData.token;

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

    const loginHandler = (token: string, expirationTime: number): void => {

        setToken(token);

        localStorage.setItem('token', token);

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