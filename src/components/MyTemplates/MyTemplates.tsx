import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';
import TemplateModel, { Template } from '../../api/models/Template/Template';
import PageInfo from '../../interfaces/PageInfo.interface';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import TemplateList from '../TemplateList/TemplateList';
import Pagination from '../Layout/Pagintation/Pagination'
import AuthContext from '../../store/auth-context';
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import classes from './MyTemplates.module.css';

const MyTemplates: React.FC = () => {

	const [templateList, setTemplateList] = useState<null | Template[]>(null);
	const { apiGetRequest, apiDeleteRequest, loading } = useApi();
	const AuthCtx = useContext(AuthContext);
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

		let source = axios.CancelToken.source();
		let PageInfo: PageInfo = {
			itemsPerPage: pageSize,
			page: pageNumber
		};

		if (AuthCtx.token)
			apiGetRequest<ResponseDataModel<Template>>([AuthCtx.token, source, PageInfo], TemplateModel.listThisUsers, applyTemplateResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [AuthCtx, pageNumber]);

	const deleteTemplateHandler = (templateToDelete: Template) => {

		let source = axios.CancelToken.source();

		if (AuthCtx.token)
			apiDeleteRequest<Template>(templateToDelete, AuthCtx.token, source, TemplateModel.delete);

		let newTemplatesArray = templateList!.filter((template) => {
			return template.id !== templateToDelete.id;
		});

		setTemplateList(newTemplatesArray);
	};

	const myTemplatesListOptions = {
		showCover: true,
		showFavoriteStar: false,
		templateGuideUrl: '/myguides/',
		allowDelete: true,
		onDelete: deleteTemplateHandler
	};

	if (templateList && !loading) {
		return (
			<div className={classes.myTemplatesBackground}>
				<div className={classes.myTemplatesContainer}>
					<TemplateList
						templates={templateList}
						templateListOptions={myTemplatesListOptions}
					/>
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
		<div className={classes.myTemplatesBackground}>
			<div className={classes.myTemplatesContainer}>
				<Spinner className={classes.spinner} />
			</div>
		</div>
	);
};

export default MyTemplates;
