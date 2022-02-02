import React from 'react';
import { Icon, IconSize } from '@blueprintjs/core';

const ResourceNotFoundMessage: React.FC<{ messageText: string }> = ({ messageText }) => {
    return (
        <React.Fragment>
            <Icon icon="issue" size={IconSize.LARGE} />
            <h3>{messageText}</h3>
        </React.Fragment>
    );
};

export default ResourceNotFoundMessage;
