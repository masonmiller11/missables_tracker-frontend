import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { HTMLTable } from '@blueprintjs/core';

import { Like } from '../../../api/models/Like/Like';

import classes from './MyFavoritesList.module.css';
import DeleteButton from '../../Button/DeleteButton/DeleteButton';

import AuthContext from '../../../store/auth-context';
import useApi from '../../../hooks/useApi';

const MyFavoritesList: React.FC<{
	likes: Like[] | null,
	onDelete: (like: Like) => void
}> = ({ likes, onDelete }) => {

	const AuthCtx = useContext(AuthContext);
	const { apiGetRequest, apiCreateRequest } = useApi();
	let history = useHistory();

	return (
		<HTMLTable interactive={true} className={classes.table}>
			<thead>
				<tr>
					<th>Template Name</th>
					<th>Description</th>
					<th>Game</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{likes!.map((like) => (
					<tr key={like.id}>
						<td><a onClick={() => history.push('/guides/' + like.template.id)}>{like.template.name}</a></td>
						<td>{
							like.template.description!.length > 45 ?
								like.template.description!.substring(0, 43) + '...' :
								like.template.description}
						</td>
						<td>{like.template.game?.title}</td>
						<td>
							<DeleteButton
								onDelete={() => onDelete(like)}
								buttonText="Remove From Favorites" />
						</td>

					</tr>
				))}
			</tbody>

		</HTMLTable >


		// <div className={classes.templateListContainer}>
		// 	{likes!.map((like) => (
		// 		<div>{like.template.name}</div>
		// 	))}
		// </div>
	);
};

export default MyFavoritesList;
