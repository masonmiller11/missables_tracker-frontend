
import { useState, useContext } from 'react';
import axios, { CancelTokenSource, AxiosResponse } from 'axios';
import { Intent } from '@blueprintjs/core';

import AuthContext from '../store/auth-context';
import { apiRefresh } from '../api';
import { AppToaster } from '../components/Layout/Toaster';


type apiRead = Promise<AxiosResponse<any>>;
type apiDelete<T> = (object: T, source: CancelTokenSource) => Promise<AxiosResponse<any>>;
type apiUpdate<T> = (object: T, source: CancelTokenSource) => Promise<AxiosResponse<any>>;
type apiCreate<T> = (object: T, source: CancelTokenSource) => Promise<AxiosResponse<any>>;

interface ReturnedData {
	saving: boolean,
	addingNew: boolean,
	loading: boolean,
	error: string | null,
	apiReadRequest: <T> (
		apiRead: apiRead,
		applyData: (data: T) => void,
	) => void,
	apiDeleteRequest: <T>(
		object: T,
		source: CancelTokenSource,
		apiDelete: apiDelete<T>,
	) => void,
	apiUpdateRequest: <T>(
		data: T,
		source: CancelTokenSource,
		apiUpdate: apiUpdate<T>
	) => void,
	apiCreateRequest: <T>(
		data: T,
		source: CancelTokenSource,
		apiCreate: apiCreate<T>,
		applyData: (data: any) => void
	) => void
}

const useApi = (useErrorHandling: boolean = true): ReturnedData => {

	const AuthCtx = useContext(AuthContext);

	//todo add a way for save successfully message

	const [saving, setSaving] = useState<boolean>(false);
	const [addingNew, setAddingNew] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const errorHandler = (message: string) => {
		setError(message);
		if (useErrorHandling)
			AppToaster.show({ message: message, intent: Intent.DANGER });
	};

	const apiReadRequest = <T extends {}>(
		apiRead: apiRead,
		applyData: (data: T) => void
	) => {
		setLoading(true);
		if (AuthCtx.isRefreshNeeded()) {
			apiRefresh()
				.then((response) => {
					AuthCtx.login(response.data.token);
				})
				.catch((err) => {
					errorHandler(err.response?.data.message ?? 'Unknown Error');
				})
		}
		apiRead
			.then((response) => {
				applyData(response.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					if (err.response.data.message != 'No favorites were found.')
						errorHandler(err.response?.data.message ?? 'Unknown Error');
				}
			});
	}

	const apiDeleteRequest = <T extends {}>(
		object: T,
		source: CancelTokenSource,
		apiDelete: apiDelete<T>,
	) => {
		setSaving(true);
		apiDelete(object, source)
			.then((response) => {
				console.log(response);
				setSaving(false);
			})
			.catch((err) => {
				setSaving(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					errorHandler(err.response?.data.message ?? 'Unknown Error');
				}
			});
	}

	const apiUpdateRequest = <T extends {}>(
		data: T,
		source: CancelTokenSource,
		apiUpdate: apiUpdate<T>
	) => {
		setSaving(true);
		apiUpdate(data, source)
			.then(() => {
				setSaving(false);
			})
			.catch((err) => {
				setSaving(false);
				if (axios.isCancel(err)) {
					console.log('api request cancelled');
				} else {
					errorHandler(err.response?.data.message ?? 'Unknown Error');
				}
			});
	}

	const apiCreateRequest = <T extends {}>(
		data: T,
		source: CancelTokenSource,
		apiCreate: apiCreate<T>,
		applyData: (data: any) => void
	) => {
		setSaving(true);
		setAddingNew(true);
		let returnData = apiCreate(data, source)
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
					errorHandler(err.response?.data.message ?? 'Unknown Error');
				}
			});
		return returnData;
	}

	return {
		loading,
		saving,
		addingNew,
		error,
		apiReadRequest,
		apiDeleteRequest,
		apiUpdateRequest,
		apiCreateRequest
	};
};

export default useApi;