import axios from 'axios';
import { baseUrl } from '../test-data/constants';

describe('API tests for JSONPLACEHOLDER', () => {
    it('Should find posts', async () => {
        let response = await axios.get(baseUrl + '/posts');
    });
});
