import { Button } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';

import classes from './Feature.module.css';

const Feature: React.FC = () => {

    const history = useHistory();

    return (
        <div className = {classes.featureContainer}>
            <div className={classes.featureTextContainer}>
                    <h1>Never Miss Again</h1>
                    <h2>Track your playthroughs. Never miss an item again.</h2>
                    <ul>
                      <li>Keep track of your playthroughs, never skip past a missable item again.</li>
                      <li>Create your own checklists. Save your progress.</li>
                      <li>No more missing out on side quests.</li>
                      <li>Browse user-created checklists.</li>
                      <li>Quit paging through GameFaqs for the "best" missables walkthrough.</li>
                    </ul>
                    <div className={classes.buttonContainer}>
                    <Button
                        text='Sign Up'
                        type="submit"
                        large={true}
                        onClick={()=>history.push('/signup')}
                    />
                    <Button
                        text='Sign In'
                        type="submit"
                        large={true}
                        onClick={()=>history.push('/login')}
                    />
                    </div>
            </div>
        </div>
    );
};

export default Feature;
