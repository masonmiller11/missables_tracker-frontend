import React, { useEffect, useState, useContext } from 'react';
import { Spinner } from '@blueprintjs/core';
import axios from 'axios';
import TemplateModel, { Template } from '../../api/models/Template/Template';
import PageInfo from '../../interfaces/PageInfo.interface';
import ResponseDataModel from '../../api/models/ResponseData/ListResponseData';
import TemplateList from '../TemplateList/TemplateList';
import Pagination from '../Layout/Pagintation/Pagination'
import useApi from '../../hooks/useApi';
import usePagination from '../../hooks/usePagination';
import ResourceNotFoundMessage from '../Message/ResourceNotFoundMessage';
import classes from './MyTemplates.module.css';

const MyTemplates: React.FC = () => {

	const [templateList, setTemplateList] = useState<null | Template[]>(null);
	const { apiReadRequest, apiDeleteRequest, loading, error } = useApi();
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

		apiReadRequest<ResponseDataModel<Template>>(TemplateModel.listThisUsers(source, PageInfo), applyTemplateResponseData);

		return function () {
			source.cancel('cancelling in cleanup');
		};

	}, [pageNumber]);

	const deleteTemplateHandler = (templateToDelete: Template) => {

		let source = axios.CancelToken.source();

		apiDeleteRequest<Template>(templateToDelete, source, TemplateModel.delete);

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

	if (error == "No guides were found.")
		return (
			<div className={classes.myTemplatesBackground}>
				<div className={classes.myTemplatesContainer}>
					<ResourceNotFoundMessage messageText="You haven't created any guides yet. Get cracking!" />
				</div>
			</div>
		)

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
							page={pageNumber}
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
