import React from 'react';

import classes from './Feature.module.css';

const Feature: React.FC = () => {
    return (
        <div className = {classes.featureContainer}>
            <div className={classes.featureTextContainer}>
                    <h1>Never Miss Again</h1>
                    <h2>Track your playthroughs. Never miss an item again.</h2>
                    <ul>
                      <li>one</li>
                      <li>two</li>
                      <li>three</li>
                      <li>four</li>
                    </ul>
            </div>
        </div>
    );
};

export default Feature;
