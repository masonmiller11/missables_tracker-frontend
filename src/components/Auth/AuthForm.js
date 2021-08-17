import { useState, useRef, useContext } from 'react';
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
    Switch,
    Tag,
    Classes,
    FormGroup,
} from '@blueprintjs/core';

import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {

    const history = useHistory();
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);

    const [isLoading, setIsLoading] = useState();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        console.log('in submitHandler')
        console.log(enteredEmail);
        console.log(enteredPassword);

    }

    return (
        <div className = {classes.authContainer}>
            <FormGroup
                className = {classes.textField}
                disabled={false}
                helperText
                inline={false}
                intent={Intent.NONE}
                labelFor="text-input"
                label="Email Address"
                
            >
                <InputGroup
                    className = {classes.textField}
                    id="text-input"
                    placeholder="email"
                    large = {true}
                    disabled={false}
                    intent={Intent.NONE}
                    inputRef = {emailInputRef}
                />
            </FormGroup>
            <FormGroup
                className = {classes.textField}
                disabled={false}
                helperText
                inline={false}
                intent={Intent.NONE}
                labelFor="text-input"
                label="Password"
            >
                <InputGroup
                    className = {classes.textField}
                    id="text-input"
                    placeholder="password"
                    large = {true}
                    disabled={false}
                    intent={Intent.NONE}
                    type= "password"
                    inputRef = {passwordInputRef}
                />
                <Button
                    className = {classes.login}
                    text="Sign In"
                    onClick={submitHandler}
                />
            </FormGroup>
            
        </div>
    );
};

export default AuthForm;
