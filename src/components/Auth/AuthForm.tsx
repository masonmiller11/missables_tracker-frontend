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

type AuthRefs = {
    emailInputRef: React.RefObject<HTMLInputElement>;
    passwordInputRef: React.RefObject<HTMLInputElement>;
    confirmPasswordInputRef: React.RefObject<HTMLInputElement>;
    usernameInputRef: React.RefObject<HTMLInputElement>;
};

const AuthForm: React.FC<{
    refs: AuthRefs;
    isLogin: boolean;
    isLoading: boolean;
    loginError: string | null | undefined;
    loginNotifcation: string | null | undefined;
    onLoginChange: () => void;
    onSubmit: (event: React.FormEvent) => void;
}> = ({
    refs,
    isLogin,
    loginError,
    loginNotifcation,
    onLoginChange,
    onSubmit,
    isLoading,
}) => {
    let intent: Intent = Intent.NONE;

    if (loginNotifcation) intent = Intent.SUCCESS;

    if (loginError) intent = Intent.DANGER;

    return (
        <div className={classes.authContainer}>
            <FormGroup
                className={classes.textField}
                intent={intent}
                helperText={loginError ? loginError : loginNotifcation}
            >
                <Label>
                    Email Address
                    <InputGroup
                        className={classes.textField}
                        placeholder="email"
                        large={true}
                        inputRef={refs.emailInputRef}
                        intent={intent}
                    />
                </Label>
                {!isLogin ? (
                    <Label>
                        Username
                        <InputGroup
                            className={classes.textField}
                            placeholder="username"
                            large={true}
                            intent={intent}
                            inputRef={refs.usernameInputRef}
                        />
                    </Label>
                ) : null}
                <Label>
                    Password
                    <InputGroup
                        className={classes.textField}
                        placeholder="password"
                        large={true}
                        type="password"
                        intent={intent}
                        inputRef={refs.passwordInputRef}
                    />
                </Label>
                {!isLogin ? (
                    <Label>
                        Confirm Password
                        <InputGroup
                            className={classes.textField}
                            placeholder="password"
                            large={true}
                            type="password"
                            intent={intent}
                            inputRef={refs.confirmPasswordInputRef}
                        />
                    </Label>
                ) : null}
                {isLoading ? (
                    <Spinner size={30} />
                ) : (
                    <Button
                        className={classes.login}
                        text={isLogin ? 'Sign In' : 'Sign Up'}
                        onClick={(event) => onSubmit(event)}
                    />
                )}
                {isLogin ? (
                    <p className={classes.login}>
                        Not a member yet? Click{' '}
                        <a onClick={onLoginChange}>here</a> to sign up!
                    </p>
                ) : (
                    <p className={classes.login}>
                        Already a member? Click{' '}
                        <a onClick={onLoginChange}>here</a> to sign in!
                    </p>
                )}
            </FormGroup>
        </div>
    );
};

export default AuthForm;
