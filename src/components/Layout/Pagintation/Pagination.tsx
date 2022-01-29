import React, { useReducer, Reducer, useEffect } from 'react';
import { Button, ButtonGroup, Intent } from '@blueprintjs/core';

interface initialState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

interface State extends initialState {
    pages: number[];
    totalPages: number;
}

interface Props {
    initialPage?: number;
    totalItems: number;
    itemsPerPage: number;
    onPageChange: (page: number) => void;
}

type Actions = { type: string; page: number; totalItems: number };

const getState = ({
    currentPage,
    itemsPerPage,
    totalItems,
}: initialState): State => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    let startPage: number,
        endPage = 0;
    if (totalPages <= 10) {
        // if there are less than 10 pages total, show all
        startPage = 1;
        endPage = totalPages;
    } else {
        //let's figure out start and end pages
        //don't do anything if current page is lower than page 6
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
            //if we're within 5 pages of the end
        } else if (currentPage + 3 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
            //else take the previous 5 pages and the next 4 pages and show those
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    //let's create an array with a length equal to the number of pages that we need to show
    //since the array is initialized with `undefined` at each position, v is undefined
    const pages = Array.from(
        { length: endPage + 1 - startPage },
        (v, i) => startPage + i
    );

    //if current page is somehow outside the range of total pages
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

export const Pagination = React.memo<Props>(
    ({ initialPage = 1, totalItems, itemsPerPage, onPageChange }) => {

        const [paginationState, paginationDispatch] = useReducer(
            reducer,
            {
                currentPage: initialPage,
                totalItems,
                itemsPerPage,
                totalPages: 0,
            },
            getState
        );

        const changePage = (page: number) => {
            paginationDispatch({ type: 'CHANGE_PAGE', page, totalItems });
            onPageChange(page);
        };

        //This is so that the UI doesn't show a page that no longer exists due to deleting items.
        //If paginationState.currentPage < 0 then we're loading the page for the first time and show use initialPage instead
        useEffect(() => {
            changePage(paginationState.currentPage > 0 ? paginationState.currentPage : initialPage);
        }, [totalItems, initialPage]);

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