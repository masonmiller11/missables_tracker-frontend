import React, { useReducer, Reducer, useEffect } from 'react';
import { Button, ButtonGroup, Intent } from '@blueprintjs/core';

interface Props {
	page?: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	mobileVersion: boolean
}

export const Pagination = React.memo<Props>(
	({ page = 1, totalItems, itemsPerPage, onPageChange, mobileVersion }) => {

		interface initialState {
			currentPage: number;
			itemsPerPage: number;
			totalItems: number;
		}

		interface State extends initialState {
			pages: number[];
			totalPages: number;
		}

		type Actions = { type: string; page: number; totalItems: number };

		const getState = ({
			currentPage,
			itemsPerPage,
			totalItems,
		}: initialState): State => {

			const totalPages = Math.ceil(totalItems / itemsPerPage);

			//We're going to show a different amount of pages depending on mobile or desktop.
			let startPage: number,
				endPage = 0,
				maxPagesShown = mobileVersion ? 5 : 10;

			//If we have less or equal pages as the max we're going to show, then show them all.
			if (totalPages <= maxPagesShown) {
				startPage = 1;
				endPage = totalPages;
			} else {

				//Figure out start and end pages. Start with mobile.
				if (mobileVersion) {

					//If we're witin the first two pages, just show the next 4.
					if (currentPage <= 2) {
						startPage = 1;
						endPage = 4;

						//If we're within 2 pages of the end show the last 4 (desktop).
					} else if (currentPage + 2 >= totalPages) {
						startPage = totalPages - 4;
						endPage = totalPages;

						//Show the previous 2 and next 2 pages on mobile.
					} else {
						startPage = currentPage - 2;
						endPage = currentPage + 2;
					}

					//Desktop
				} else {
					if (currentPage <= 5) {
						startPage = 1;
						endPage = 10;

						//If we're within 5 pages of the end show the last 10 (desktop).
					} else if (currentPage + 5 >= totalPages) {
						startPage = totalPages - 10;
						endPage = totalPages;

						//Show the previous 5 and next 5 pages on desktop.
					} else {
						startPage = currentPage - 5;
						endPage = currentPage + 5;
					}
				}
			}

			//Create an array with a length equal to the number of pages that we need to show. We will map through tis later to create buttons.
			const pages = Array.from(
				{ length: endPage + 1 - startPage },
				(v, i) => startPage + i
			);

			//If current page is somehow outside the range of total pages
			let correctCurrentpage = currentPage;
			if (currentPage > totalPages) correctCurrentpage = totalPages;
			if (currentPage <= 0) correctCurrentpage = 1;

			return {
				currentPage: correctCurrentpage,
				itemsPerPage: itemsPerPage,
				totalItems: totalItems,
				pages,
				totalPages,
			};
		};

		const reducer: Reducer<State, Actions> = (state, action) => {

			//TODO: if we ever add another action.type, change this into a switch instead of if else
			if (action.type === 'CHANGE_PAGE') {
				return getState({
					...state,
					currentPage: action.page,
					totalItems: action.totalItems,
				});
			} else {
				throw new Error();
			}

		};

		const [paginationState, paginationDispatch] = useReducer(
			reducer,
			{
				currentPage: page,
				totalItems,
				itemsPerPage,
				totalPages: 0,
				pages: []
			});

		const changePage = (page: number) => {
			paginationDispatch({ type: 'CHANGE_PAGE', page, totalItems });
			onPageChange(page);
		};

		//This is so that the UI doesn't show a page that no longer exists due to deleting items.
		useEffect(() => {
			changePage(page);
		}, [totalItems, page]);

		//If there's only one page, do not show anything
		if (paginationState.totalPages === 1) return null;

		return (
			<div>
				<ButtonGroup>
					<Button
						disabled={paginationState.currentPage === 1}
						onClick={() => changePage(1)}
					>
						First
					</Button>
					<Button
						icon="chevron-left"
						disabled={paginationState.currentPage === 1}
						onClick={() =>
							changePage(
								Math.max(1, paginationState.currentPage - 1)
							)
						}
					/>
					{paginationState.pages.map((page) => (
						<Button
							key={page}
							intent={
								paginationState.currentPage === page
									? Intent.PRIMARY
									: Intent.NONE
							}
							onClick={() => changePage(page)}
						>
							{page}
						</Button>
					))}
					<Button
						icon="chevron-right"
						disabled={
							paginationState.currentPage ===
							paginationState.totalPages
						}
						onClick={() =>
							changePage(
								Math.min(
									paginationState.currentPage + 1,
									paginationState.totalPages
								)
							)
						}
					/>
					<Button
						disabled={
							paginationState.currentPage ===
							paginationState.totalPages
						}
						onClick={() =>
							changePage(paginationState.totalPages)
						}
					>
						Last
					</Button>
				</ButtonGroup>
			</div>
		);
	}
);

export default Pagination;