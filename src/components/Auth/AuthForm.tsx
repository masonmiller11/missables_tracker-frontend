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
    Label,
    Switch,
    Tag,
    Classes,
    FormGroup,
} from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import jwt from 'jwt-decode';


import { login } from '../../api/index';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm: React.FC = () => {
    const history = useHistory();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const authCtx = useContext(AuthContext);

    const [isLogin, setIsLogIn] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const changeLoginHandler = (): void => {
        setIsLogIn((prevState) => !prevState);
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        //add validation??

        setIsLoading(true);

        //handle whether this is a sign up or a log in.

        apiLogin(enteredEmail, enteredPassword)
            .then((response) => {
                setIsLoading(false);
                console.log(response.data.token);
                console.log(jwt(response.data.token));
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err.response.data.message);
            });
    };

    return (
        <div className={classes.authContainer}>
            <FormGroup className={classes.textField} intent={Intent.NONE}>
                <Label> Email Address
                    <InputGroup
                        className={classes.textField}
                        placeholder="email"
                        large={true}
                        intent={Intent.NONE}
                        inputRef={emailInputRef}
                    />
                </Label>
                <Label> Password
                    <InputGroup
                        className={classes.textField}
                        placeholder="password"
                        large={true}
                        intent={Intent.NONE}
                        type="password"
                        inputRef={passwordInputRef}
                    />
                </Label>
                {isLoading ? 
                    <Spinner/> : 
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
