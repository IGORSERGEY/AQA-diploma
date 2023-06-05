import axios from 'axios';
import { baseUrl } from '../test-data/constants';

export const reqres = axios.create({
    baseURL: baseUrl,
    timeout: 1000,
});
