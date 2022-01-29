
import { useState, Dispatch, SetStateAction } from 'react';

interface ReturnedData {
	countOfTotalItems: number,
	pageNumber: number,
	pageSize: number,
	setCountOfTotalItems: Dispatch<SetStateAction<number>>,
	setPageSize: Dispatch<SetStateAction<number>>,
	pageChangeHandler: (page: number) => void
}

const usePagination = (initialPageNumber: number, 
	initialPageSize: number,
	initialCountOfTotalItems: number = 0): ReturnedData => {

	const [countOfTotalItems, setCountOfTotalItems] = useState<number>(initialCountOfTotalItems);
	const [pageNumber, setPageNumber] = useState<number>(initialPageNumber);
	const [pageSize, setPageSize] = useState<number>(initialPageSize);

	const pageChangeHandler = (pageNumber: number) => {
		setPageNumber(pageNumber);
	}

	return {
		countOfTotalItems,
		pageNumber,
		pageSize: initialPageSize,
		setCountOfTotalItems,
		setPageSize,
		pageChangeHandler
	};
};

export default usePagination;


