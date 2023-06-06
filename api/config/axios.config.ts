import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../test-data/constants';
import * as AxiosLogger from 'axios-logger';
import { apiLogger } from './logger.config';

export const reqres = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
});

const axiosLoggerConfig = {
    prefixText: 'INFO',
    dateFormat: '[dd/MM/yyyy] [hh:mm:ss]',
};

reqres.interceptors.request.use(function (request) {
    apiLogger.info(`Request: ${request.method} ${request.url} ${request.data ? JSON.stringify(request.data) : ''}`);
    AxiosLogger.requestLogger(request, axiosLoggerConfig);
    return request;
});
reqres.interceptors.response.use(
    function (response) {
        apiLogger.info(`Response: ${JSON.stringify(response.data)}`);
        return AxiosLogger.responseLogger(response, axiosLoggerConfig);
    },
    function (error) {
        apiLogger.error(`${error.message}`);
        return AxiosLogger.errorLogger(error, {
            ...axiosLoggerConfig,
            prefixText: 'ERROR',
        });
    }
);
