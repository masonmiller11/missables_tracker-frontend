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

import { login } from '../../api/index';
import classes from './AuthForm.module.css';

const AuthForm: React.FC = () => {
    const history = useHistory();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState();

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;

        login(enteredEmail ?? '', enteredPassword ?? '')
            .then((response) => {
                console.log(response.data.token);
            })
            .catch((err) => {
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
                <Button
                    className={classes.login}
                    text="Sign In"
                    onClick={submitHandler}
                />
            </FormGroup>
        </div>
    );
};

export default AuthForm;
