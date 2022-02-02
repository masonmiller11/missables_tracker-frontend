
import { useState, Dispatch, SetStateAction, useContext } from 'react';
import axios, { CancelTokenSource, AxiosResponse, CancelToken } from 'axios';
import { Button, Card, Elevation, Intent } from '@blueprintjs/core';

import AuthContext from '../store/auth-context';
import { apiRefresh } from '../api';
import Auth from '../components/Auth/Auth';
import { AppToaster } from '../components/Layout/Toaster';


type apiGet = (...params: any) => Promise<AxiosResponse<any>>;
type apiDelete<T> = (object: T, token: string, source: CancelTokenSource) => Promise<AxiosResponse<any>>;
type apiPatch<T> = (object: T, token: string, source: CancelTokenSource) => Promise<AxiosResponse<any>>;
type apiCreate<T> = (object: T, token: string, source: CancelTokenSource) => Promise<AxiosResponse<any>>;

interface ReturnedData {
	saving: boolean,
	addingNew: boolean,
	loading: boolean,
	apiGetRequest: <T> (
		params: any[],
		apiGet: apiGet,
		applyData: (data: T) => void,
	) => void,
	apiDeleteRequest: <T>(
		object: T,
		token: string,
		source: CancelTokenSource,
		apiDelete: apiDelete<T>,
	) => void,
	apiPatchRequest: <T>(
		data: T,
		token: string,
		source: CancelTokenSource,
		apiPatch: apiPatch<T>
	) => void,
	apiCreateRequest: <T>(
		data: T,
		token: string,
		source: CancelTokenSource,
		apiCreate: apiCreate<T>,
		applyData: (data: any) => void
	) => void
}

const useApi = (): ReturnedData => {

	const AuthCtx = useContext(AuthContext);

	const errorHandler = (message: string, intent: Intent) => {
		AppToaster.show({ message: message, intent: intent });
	};

	//todo: real error handling.
	//todo add a way for save successfully message

	const [saving, setSaving] = useState<boolean>(false);
	const [addingNew, setAddingNew] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const apiGetRequest = <T extends {}>(
		params: any[],
		apiGet: apiGet,
		applyData: (data: T) => void
	) => {

		setLoading(true);

		if (AuthCtx.isRefreshNeeded()) {
			apiRefresh()
				.then((response) => {
					AuthCtx.login(response.data.token);
				})
				.catch((err) => {
					errorHandler(err.response?.data.message ?? 'Unknown Error', Intent.DANGER);
				})
		}

		apiGet(...params)
			.then((response) => {
				applyData(response.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					errorHandler(err.response?.data.message ?? 'Unknown Error', Intent.DANGER);
				}
			});

	}

	const apiDeleteRequest = <T extends {}>(
		object: T,
		token: string,
		source: CancelTokenSource,
		apiDelete: apiDelete<T>,
	) => {

		setSaving(true);

		apiDelete(object, token, source)
			.then((response) => {
				console.log(response);
				setSaving(false);
			})
			.catch((err) => {
				setSaving(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					errorHandler(err.response?.data.message ?? 'Unknown Error', Intent.DANGER);
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
			.then(() => {
				setSaving(false);
			})
			.catch((err) => {
				setSaving(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					errorHandler(err.response?.data.message ?? 'Unknown Error', Intent.DANGER);
				}
			});

	}

	const apiCreateRequest = <T extends {}>(
		data: T,
		token: string,
		source: CancelTokenSource,
		apiCreate: apiCreate<T>,
		applyData: (data: any) => void
	) => {

		setSaving(true);
		setAddingNew(true);

		let returnData = apiCreate(data, token, source)
			.then((response) => {
				setSaving(false);
				setAddingNew(false);
				applyData(response.data);
			})
			.catch((err) => {
				setSaving(false);
				setAddingNew(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					errorHandler(err.response?.data.message ?? 'Unknown Error', Intent.DANGER);
				}
			});

		return returnData;

	}

	return {
		loading,
		saving,
		addingNew,
		apiGetRequest,
		apiDeleteRequest,
		apiPatchRequest,
		apiCreateRequest
	};
};

export default useApi;