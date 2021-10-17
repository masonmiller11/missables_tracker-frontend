import React from 'react';
import { Icon, IconSize } from '@blueprintjs/core';

const ErrorMessage: React.FC<{ messageText: string }> = ({ messageText }) => {
    return (
        <React.Fragment>
            <Icon icon="warning-sign" size={IconSize.LARGE} />
            <h3>{messageText}</h3>
        </React.Fragment>
    );
};

export default ErrorMessage;
