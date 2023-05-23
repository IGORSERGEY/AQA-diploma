import axios from 'axios';
import { baseUrl, maxUserId } from '../test-data/constants';
import { validateSchema } from '../helpers/schema_validator';
import * as userListSchema from '../schema/user_list_schema.json';
import * as userSchema from '../schema/user_schema.json';
import * as registrationResponseSchema from '../schema/registration_response_schema.json';
import { RequestBodyGenerator, randomUserIdNumber } from '../helpers/request_body_generator';

describe('Positive API tests for reqres.in', () => {
    const userId = randomUserIdNumber;

    it('Should get users list', async () => {
        let response = await axios.get(baseUrl + '/users', {
            params: {
                page: 1,
                per_page: maxUserId,
            },
        });
        expect(response.status).toBe(200);
        validateSchema(userListSchema, response.data);
        expect(response.data.per_page).toBe(maxUserId);
        expect(response.data.page).toBe(1);
    });

    it('Should create user', async () => {
        const requestBody = RequestBodyGenerator.getUserToCreate();
        let response = await axios.post(baseUrl + '/users', requestBody);
        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(requestBody);
    });
    it(`Should find user №${userId} by id`, async () => {
        let response = await axios.get(baseUrl + `/users/${userId}`);
        expect(response.data.data.id).toBe(userId);
        validateSchema(userSchema, response.data);
    });
    it(`Should update user №${userId}`, async () => {
        const requestBody = RequestBodyGenerator.getUserForUpdate(userId);
        let response = await axios.put(baseUrl + `/users/${userId}`, requestBody);
        expect(response.status).toBe(200);
        validateSchema(userSchema, response.data);
        expect(response.data.data.id).toBe(userId);
        expect(response.data).toMatchObject(requestBody);
    });
    it(`Should update user's №${userId} email`, async () => {
        let responseBefore = await axios.get(baseUrl + `/users/${userId}`);
        const requestBody = RequestBodyGenerator.getUserForUpdate(userId);
        let responseAfter = await axios.patch(baseUrl + `/users/${userId}`, requestBody);
        expect(responseAfter.status).toBe(200);

        validateSchema(userSchema, responseAfter.data);
        expect(responseAfter.data.data.id).toBe(userId);

        expect(responseBefore.data).not.toMatchObject(requestBody);
        expect(responseAfter.data).toMatchObject(requestBody);
    });

    it(`Should delete user №${userId}`, async () => {
        let response = await axios.delete(baseUrl + `/users/${userId}`);
        expect(response.status).toBe(204);
    });
    it('Should register a user', async () => {
        let response = await axios.post(baseUrl + '/register', RequestBodyGenerator.getUserCredentials());
        expect(response.status).toBe(200);
        validateSchema(registrationResponseSchema, response.data);
    });
});
describe('Negative tests for reqres.in', () => {
    it("Registration: Should give an error 'Missing password' when password wasn't provided", async () => {
        try {
            await axios.post(baseUrl + '/register', RequestBodyGenerator.getUserCredentialsWithoutPassword());
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe('Missing password');
        }
    });
    it("Login: Should give an error 'Missing password' when password wasn't provided", async () => {
        try {
            await axios.post(baseUrl + '/login', RequestBodyGenerator.getUserCredentialsWithoutPassword());
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe('Missing password');
        }
    });
    it('Should get 404 error when trying to find nonexistent user', async () => {
        try {
            await axios.get(baseUrl + `/users/99999999999999`);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }
    });
});
