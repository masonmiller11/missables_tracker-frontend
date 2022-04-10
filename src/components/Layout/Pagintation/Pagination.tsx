import React, { useReducer, Reducer, useEffect, useRef } from 'react';
import { Button, ButtonGroup, Intent } from '@blueprintjs/core';
import classes from './Pagination.module.css';
import { MutableRefObject } from 'react';
import { LegacyRef } from 'react';

interface Props {
	page?: number;
	totalItems: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
}

export const Pagination = React.memo<Props>(
	({ page = 1, totalItems, itemsPerPage, onPageChange }) => {

		const containerRef = useRef<HTMLDivElement>(null);

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

			//We're going to show a different amount of pages depending on the size of the container.
			//trailing pages in front of and behind current page number.
			//maxVisiblePages, the number of pages we want to display at any time.
			let startPage: number,
				endPage = 0,
				trailingPages = Math.floor(containerRef.current!.clientWidth / 120),
				maxVisiblePages = Math.floor(containerRef.current!.clientWidth / 60);

			//Figure out start and end pages. 

			//If we have less or equal pages as the maxVisiblePages, show them all.
			if (totalPages <= maxVisiblePages) {
				startPage = 1;
				endPage = totalPages;
			} else {

				//If we're witin the first set of trailingPages, endPage should be maxVisiblePages.
				if (currentPage <= trailingPages) {
					startPage = 1;
					endPage = maxVisiblePages;

				//If we're within the last set of trailingPages, then end page should be the last page.
				} else if (currentPage + trailingPages >= totalPages) {
					startPage = totalPages - maxVisiblePages;
					endPage = totalPages;

				//If we are not within the last or first set of trailingPages, then show a set of trailingPage before and after the current page.
				} else {
					startPage = currentPage - trailingPages;
					endPage = currentPage + trailingPages;
				}

				//Desktop
				// } else {
				// 	if (currentPage <= 5) {
				// 		startPage = 1;
				// 		endPage = 10;

				// 		//If we're within 5 pages of the end show the last 10 (desktop).
				// 	} else if (currentPage + 5 >= totalPages) {
				// 		startPage = totalPages - 10;
				// 		endPage = totalPages;

				// 		//Show the previous 5 and next 5 pages on desktop.
				// 	} else {
				// 		startPage = currentPage - 5;
				// 		endPage = currentPage + 5;
				// 	}
				// }
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
			console.log(containerRef.current?.clientWidth)
		};

		//This is so that the UI doesn't show a page that no longer exists due to deleting items.
		useEffect(() => {
			changePage(page);
			console.log('IN USE EFFFECT, WIDTH:' + containerRef.current?.clientWidth)
		}, [totalItems, page]);

		//If there's only one page, do not show anything
		if (paginationState.totalPages === 1) return null;

		return (
			<div ref={containerRef} className={classes.paginationContainer}>
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