import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from '@blueprintjs/core';
import GameModel, { Game } from '../../api/models/Game/Game';
import TemplateModel, { Template } from '../../api/models/Template/Template';
import PageInfo from '../../interfaces/PageInfo.interface';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import TemplateList from '../TemplateList/TemplateList';
import Pagination from '../Layout/Pagintation/Pagination'
import GameSummaryCard from '../Layout/GameSummary/GameSummaryCard';
import usePagination from '../../hooks/usePagination';
import useApi from '../../hooks/useApi';
import classes from './GameTemplates.module.css';

const GameTemplates: React.FC<{ gameId: string }> = ({
	gameId: gameIdProp,
}) => {

	const gameTemplatesListOptions = {
		showCover: false,
		showFavoriteStar: true,
		templateGuideUrl: '/guides/',
		allowDelete: false,
	};

	const [templateList, setTemplateList] = useState<null | Template[]>(null);
	const [game, setGame] = useState<Game>();
	const [loading, setLoading] = useState<boolean>(false);
	const { apiGetRequest, loading: apiLoading } = useApi();

	let {
		countOfTotalItems,
		pageNumber,
		pageSize,
		setCountOfTotalItems,
		setPageSize,
		pageChangeHandler
	} = usePagination(1, 10);

	const applyTemplateResponseData = (responseData: ResponseDataModel<Template>) => {
		setTemplateList(responseData.items);
		setCountOfTotalItems(responseData.totalItems);
	}

	useEffect(() => {

		setLoading(true);
		let source = axios.CancelToken.source();
		let PageInfo: PageInfo = {
			itemsPerPage: pageSize,
			page: pageNumber
		};

		(async function () {

			apiGetRequest(TemplateModel.list(gameIdProp, source, PageInfo), applyTemplateResponseData)

			apiGetRequest(GameModel.read(gameIdProp, source), setGame);

		})().then(() => setLoading(false));


	}, [gameIdProp,]);

	useEffect(() => {

		let source = axios.CancelToken.source();
		let PageInfo: PageInfo = {
			itemsPerPage: pageSize,
			page: pageNumber
		};

		apiGetRequest(TemplateModel.list(gameIdProp, source, PageInfo), applyTemplateResponseData)

	}, [pageNumber])

	if (templateList && game) {
		//get Game and templates in here. If we don't have both, show loading. Remove loading from below children.
		return (
			<div className={classes.gameTemplatesBackground}>
				<div className={classes.gameTemplatesContainer}>
					<GameSummaryCard game={game} />
					{!apiLoading ?
						<TemplateList
							templates={templateList}
							templateListOptions={gameTemplatesListOptions}
						/>
						: <Spinner className={classes.spinner} />
					}
					<div className={classes.paginationContainer}>
						<Pagination
							initialPage={pageNumber}
							totalItems={countOfTotalItems}
							itemsPerPage={pageSize}
							onPageChange={pageChangeHandler}
						/>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.gameTemplatesBackground}>
			<div className={classes.gameTemplatesContainer}>
				<Spinner className={classes.spinner} />
			</div>
		</div>
	);
};

export default GameTemplates;
