import axios, { AxiosInstance } from 'axios';
import { AppConfig } from '../common/configuration';
import { ILogger } from '../common/types/logger';
import {
	BIN_API_REQUEST_ERROR,
	BIN_API_REQUEST_SENT,
	BIN_API_RESPONSE_ERROR,
	BIN_API_RESPONSE_RECEIVED
} from './messages';

export const getBinApiAxiosInstance = (appConfig: AppConfig, logger: ILogger): AxiosInstance => {
	const instance = axios.create({ baseURL: appConfig.binApi.url })

	instance.interceptors.request.use((config) => {
		config.headers['x-api-key'] = appConfig.binApi.apiKey;
		logger.debug(BIN_API_REQUEST_SENT)
		return config;
	}, (error: Error) => {
		logger.error(BIN_API_REQUEST_ERROR, { error })
		return Promise.reject(error)
	})

	instance.interceptors.response.use((config) => {
		logger.debug(BIN_API_RESPONSE_RECEIVED)
		return config;
	}, (error: Error) => {
		logger.error(BIN_API_RESPONSE_ERROR, { error })
		return Promise.reject(error)
	});

	return instance
}
