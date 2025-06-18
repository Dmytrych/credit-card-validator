import axios, { AxiosInstance } from 'axios';
import { AppConfig } from '../common/configuration';
import { ILogger } from '../common/types/logger';

export const getBinApiAxiosInstance = (appConfig: AppConfig, logger: ILogger): AxiosInstance => {
	const instance = axios.create({ baseURL: appConfig.binApi.url })

	instance.interceptors.request.use((config) => {
		config.headers['x-api-key'] = appConfig.binApi.apiKey;
		logger.debug('Sent a request BIN API')
		return config;
	}, (error: Error) => {
		logger.error('Error sending request to BIN API', { error })
		return Promise.reject(error)
	})

	instance.interceptors.response.use((config) => {
		logger.debug('Received a response from BIN API')
		return config;
	}, (error: Error) => {
		logger.error('Error reading a BIN API response', { error })
		return Promise.reject(error)
	});

	return instance
}