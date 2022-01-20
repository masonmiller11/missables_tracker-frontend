
import { useState, Dispatch, SetStateAction } from 'react';
import axios, { CancelTokenSource, AxiosResponse, CancelToken } from 'axios';

type apiGet = (...params: any) => Promise<AxiosResponse<any>>;
type apiDelete = (objectId: string | number, token: string, source: CancelTokenSource) => Promise<AxiosResponse<any>>;
type apiPatch<T> = (object: T, token: string, source: CancelTokenSource) => Promise<AxiosResponse<any>>;
type apiCreate<T> = (object: T, id: string | number | null, token: string, source: CancelTokenSource) => Promise<AxiosResponse<any>>;

interface ReturnedData {
	saving: boolean,
	addingNew: boolean,
	apiGetRequest: <T> (
		applyData: (data: T) => void,
		apiGet: apiGet,
		params: any[]
	) => void,
	apiDeleteRequest: (
		objectId: string | number,
		apiDelete: apiDelete,
		token: string,
		source: CancelTokenSource
	) => void,
	apiPatchRequest: <T>(
		data: T,
		token: string,
		source: CancelTokenSource,
		apiPatch: apiPatch<T>
	) => void,
	apiCreateRequest: <T extends { }>(
		data: T,
		parentId: string | number,
		token: string,
		source: CancelTokenSource,
		apiCreate: apiCreate<T>,
		applyData: (data: any) => void
	) => void
}

const useApi = (): ReturnedData => {

	//todo: real error handling.
	//todo add a way for save successfully message

	const [saving, setSaving] = useState<boolean>(false);
	const [addingNew, setAddingNew] = useState<boolean>(false);

	const apiGetRequest = <T extends {}> (
		applyData: (data: T) => void,
		apiGet: apiGet,
		params: any[]
	) => {

		console.log(params);

		apiGet(...params)
		.then((response) => {
			applyData(response.data);
		})
		.catch((err) => {
			if (axios.isCancel(err)) {
				console.log('api request cancelled');
			} else {
				console.log(
					err.response?.data.message ?? 'unknown error' + err
				);
			}
		});
		
	}

	const apiDeleteRequest = (
		objectId: string | number,
		apiDelete: apiDelete,
		token: string,
		source: CancelTokenSource
	) => {

		setSaving(true);

		apiDelete(objectId, token, source)
			.then((response) => {
				console.log(response);
				setSaving(false);
			})
			.catch((err) => {
				setSaving(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					console.log(
						err.response?.data.message ?? 'unknown error'
					);
				}
			});

	}

	const apiPatchRequest = <T extends {}>(
		data: T,
		token: string,
		source: CancelTokenSource,
		apiPatch: apiPatch<T>
	) => {

		setSaving(true);

		apiPatch(data, token, source)
			.then((response) => {
				setSaving(false);
				console.log(response);
			})
			.catch((err) => {
				setSaving(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					console.log(
						err.response?.data.message ?? 'unknown error'
					);
				}
			});

	}

	const apiCreateRequest = <T extends { }>(
		data: T,
		parentId: string | number,
		token: string,
		source: CancelTokenSource,
		apiCreate: apiCreate<T>,
		applyData: (data: any) => void
	) => {

		setSaving(true);
		setAddingNew(true);

		let returnData = apiCreate(data, parentId, token, source)
			.then((response) => {
				setSaving(false)
				applyData(response.data);
				setAddingNew(false);
			})
			.catch((err) => {
				setSaving(false);
				setAddingNew(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					console.log(
						err.response?.data.message ?? 'unknown error'
					);
				}
			});

		return returnData;

	}

	return {
		apiGetRequest,
		apiDeleteRequest,
		saving,
		addingNew,
		apiPatchRequest,
		apiCreateRequest
	};
};

export default useApi;