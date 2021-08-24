import React, { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { apiLogin, apiSignUp } from '../../api/index';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';
import AuthForm from './AuthForm';

const Auth: React.FC = () => {
    const history = useHistory();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const refs = {
        emailInputRef: emailInputRef,
        passwordInputRef: passwordInputRef,
        confirmPasswordInputRef: confirmPasswordInputRef,
        usernameInputRef: usernameInputRef
    }

    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogIn] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string | null>();
    const [loginNotification, setLoginNotification] = useState<string | null>();

    const changeLoginHandler = (): void => {
        setLoginError(null);
        setLoginNotification(null);
        setIsLogIn((prevState) => !prevState);
    }; //so that it can be log in or sign up on a button click.

    const loginSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        setLoginError(null);
        setLoginNotification(null);

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        //add validation??
        if (!enteredEmail || !enteredPassword) {
            setLoginError('Cannot login without email and password');
            return;
        } 

        setIsLoading(true);

        apiLogin(enteredEmail, enteredPassword)
            .then((response) => {
                setIsLoading(false);
                authCtx.login(response.data.token);
                history.replace('/'); //profile or home screen should go here.
            })
            .catch((err) => {
                setIsLoading(false);
                setLoginError(
                    err.response.data.message ?? 'unknown login error'
                );
            });
    };

    const signupSubmitHandler = (event: React.FormEvent) => {
        console.log('signupSubmitHandler clicked');
        event.preventDefault();

        setLoginError(null);
        setLoginNotification(null);

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;
        const enteredUsername = usernameInputRef.current?.value;
        const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

        //add validation to check if email is valid.

        if (!enteredEmail || !enteredPassword || !enteredUsername) {
            setLoginError('Cannot sign up without email, username, password, and password confirmation');
            return;
        } 

        if (enteredConfirmPassword !== enteredPassword) {
            setLoginError('Passwords did not match');
            return;
        }

        setIsLoading(true);

        apiSignUp(enteredEmail, enteredPassword, enteredUsername)
            .then((response) => {
                setIsLoading(false);
                setLoginNotification('User created! Go ahead and log in!');
                setIsLogIn(true);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err.response);
                setLoginError(
                    err.response.data.message ?? 'unknown signup error'
                );
            });
    }

    return (
        <div className={classes.authContainer}>
            <AuthForm 
                refs={refs} 
                isLogin={isLogin} 
                isLoading={isLoading}
                loginError={loginError} 
                loginNotifcation={loginNotification}
                onSubmit={isLogin ? loginSubmitHandler : signupSubmitHandler} 
                onLoginChange={changeLoginHandler}
            />
        </div>
    );
};

export default Auth;
