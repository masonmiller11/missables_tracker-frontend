import React, { useState, useRef, useContext } from 'react';
import {
    Button,
    H5,
    Icon,
    IconSize,
    InputGroup,
    Intent,
    Menu,
    MenuItem,
    Spinner,
    SpinnerSize,
    Label,
    Switch,
    Tag,
    Classes,
    FormGroup,
} from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

import { apiLogin } from '../../api/index';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm: React.FC = () => {
    const history = useHistory();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogIn] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string|null>();

    const changeLoginHandler = (): void => {
        setIsLogIn((prevState) => !prevState);
    } //so that it can be log in or sign up on a button click.

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        //add validation??
        if (!enteredEmail || !enteredPassword) return;

        setIsLoading(true);

        //handle whether this is a sign up or a log in.

        apiLogin(enteredEmail, enteredPassword)
            .then((response) => {
                setIsLoading(false);
                console.log(response.data.token);
                authCtx.login(response.data.token);
                console.log(authCtx.token);
                history.replace('/'); //profile or home screen should go here.
            })
            .catch((err) => {
                setIsLoading(false);
                setLoginError(err.response.data.message ?? 'unknown login error');
                console.log(err.response.data.message);
            });
    };

    return (
        <div className={classes.authContainer}>
            <FormGroup className={classes.textField} intent={!loginError ? Intent.NONE : Intent.DANGER} helperText = {loginError}>
                <Label> Email Address
                    <InputGroup
                        className={classes.textField}
                        placeholder="email"
                        large={true}
                        inputRef={emailInputRef}
                        intent={!loginError ? Intent.NONE : Intent.DANGER}
                    />
                </Label>
                <Label> Password
                    <InputGroup
                        className={classes.textField}
                        placeholder="password"
                        large={true}
                        type="password"
                        intent={!loginError ? Intent.NONE : Intent.DANGER}
                        inputRef={passwordInputRef}
                    />
                </Label>
                {isLoading ? 
                    <Spinner size = {30}/> : 
                    <Button
                        className={classes.login}
                        text="Sign In"
                        onClick={submitHandler}
                    />
                }
            </FormGroup>
        </div>
    );
};

export default AuthForm;
