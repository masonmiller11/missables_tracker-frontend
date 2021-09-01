import { useEffect, useContext } from 'react';

import { apiListPopularGames } from '../../../api';
import AuthContext from '../../../store/auth-context';

const PopularGames: React.FC = (props: any) => {
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        apiListPopularGames().then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err.response?.data.message ?? 'unknown login error');
        });
    });

    return (
        <div>
            Popular Games!
        </div>
    )
};

export default PopularGames;
