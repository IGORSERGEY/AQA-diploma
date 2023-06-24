import axios from 'axios';
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
    AxiosLogger.requestLogger(request, {
        ...axiosLoggerConfig,
        logger: apiLogger.info.bind(apiLogger),
    });
    return request;
});
reqres.interceptors.response.use(
    function (response) {
        return AxiosLogger.responseLogger(response, {
            ...axiosLoggerConfig,
            logger: apiLogger.info.bind(apiLogger),
        });
    },
    function (error) {
        apiLogger.error(`${error.message}`);
        return AxiosLogger.errorLogger(error, {
            ...axiosLoggerConfig,
            prefixText: 'ERROR',
            logger: apiLogger.error.bind(apiLogger),
        });
    }
);
