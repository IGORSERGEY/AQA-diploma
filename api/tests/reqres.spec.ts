import axios from 'axios';
import { baseUrl, maxUserId, missingPasswordMessage, nonExistUser, usersPage } from '../test-data/constants';
import { validateSchema } from '../helpers/schema_validator';
import * as userListSchema from '../schema/user_list_schema.json';
import * as userSchema from '../schema/user_schema.json';
import * as registrationResponseSchema from '../schema/registration_response_schema.json';
import { RequestBodyGenerator, randomUserIdNumber } from '../helpers/request_body_generator';
import { apiLogger } from '../config/logger.config';

describe('Positive API tests for reqres.in', () => {
    const userId = randomUserIdNumber;

    it('Should get users list', async () => {
        apiLogger.info(`Sending request [GET] ${baseUrl}/users ...`);
        let response = await axios.get(baseUrl + '/users', {
            params: {
                page: usersPage,
                per_page: maxUserId,
            },
        });
        apiLogger.info(`The response is:\n${JSON.stringify(response.data)}`);
        expect(response.status).toBe(200);
        validateSchema(userListSchema, response.data);
        expect(response.data.per_page).toBe(maxUserId);
        expect(response.data.page).toBe(usersPage);
    });

    it('Should create user', async () => {
        const requestBody = RequestBodyGenerator.getUserToCreate();
        apiLogger.info(`Sending request [POST] ${baseUrl}/users with body: \n${JSON.stringify(requestBody)}`);
        let response = await axios.post(baseUrl + '/users', requestBody);
        apiLogger.info(`The response is:\n${JSON.stringify(response.data)}`);

        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(requestBody);
    });
    it(`Should find user №${userId} by id`, async () => {
        apiLogger.info(`Sending request [GET] ${baseUrl}/users/${userId} ...`);
        let response = await axios.get(baseUrl + `/users/${userId}`);
        apiLogger.info(`The response is:\n${JSON.stringify(response.data)}`);

        expect(response.data.data.id).toBe(userId);
        validateSchema(userSchema, response.data);
    });
    it(`Should update user №${userId}`, async () => {
        const requestBody = RequestBodyGenerator.getUserForUpdate(userId);
        apiLogger.info(`Sending request [PUT] ${baseUrl}/users/${userId} with body: \n${JSON.stringify(requestBody)}`);
        let response = await axios.put(baseUrl + `/users/${userId}`, requestBody);
        apiLogger.info(`The response is:\n${JSON.stringify(response.data)}`);

        expect(response.status).toBe(200);
        validateSchema(userSchema, response.data);
        expect(response.data.data.id).toBe(userId);
        expect(response.data).toMatchObject(requestBody);
    });
    it(`Should update user's №${userId} email`, async () => {
        apiLogger.info(`Sending request [GET] ${baseUrl}/users/${userId} ...`);
        let responseBefore = await axios.get(baseUrl + `/users/${userId}`);
        apiLogger.info(`The response before patching is:\n${JSON.stringify(responseBefore.data)}`);
        const requestBody = RequestBodyGenerator.getUserForUpdate(userId);
        apiLogger.info(`Sending request [PATCH] ${baseUrl}/users with body: \n${JSON.stringify(requestBody)}`);
        let responseAfter = await axios.patch(baseUrl + `/users/${userId}`, requestBody);
        apiLogger.info(`The response after patching is:\n${JSON.stringify(responseAfter.data)}`);

        expect(responseAfter.status).toBe(200);
        validateSchema(userSchema, responseAfter.data);
        expect(responseAfter.data.data.id).toBe(userId);
        expect(responseBefore.data).not.toMatchObject(requestBody);
        expect(responseAfter.data).toMatchObject(requestBody);
    });

    it(`Should delete user №${userId}`, async () => {
        apiLogger.info(`Sending request [DELETE] ${baseUrl}/users/${userId} ...`);
        let response = await axios.delete(baseUrl + `/users/${userId}`);
        apiLogger.info(`The response is:\n${JSON.stringify(response.data)}`);
        expect(response.status).toBe(204);
    });
    it('Should register a user', async () => {
        const requestBody = RequestBodyGenerator.getUserCredentials();
        apiLogger.info(`Sending request [POST] ${baseUrl}/users/${userId} with body: \n${JSON.stringify(requestBody)}`);
        let response = await axios.post(baseUrl + '/register', requestBody);
        apiLogger.info(`The response is:\n${JSON.stringify(response.data)}`);
        expect(response.status).toBe(200);
        validateSchema(registrationResponseSchema, response.data);
    });
});
describe('Negative tests for reqres.in', () => {
    it(`Registration: Should give an error '${missingPasswordMessage}' when password wasn't provided`, async () => {
        try {
            const requestBody = RequestBodyGenerator.getUserCredentialsWithoutPassword();
            apiLogger.info(`Sending request [POST] ${baseUrl}/register with body: \n${JSON.stringify(requestBody)}`);
            await axios.post(baseUrl + '/register', requestBody);
        } catch (error: any) {
            apiLogger.info(`The response is:\n${JSON.stringify(error.response.data)}`);
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe(missingPasswordMessage);
        }
    });
    it(`Login: Should give an error '${missingPasswordMessage}' when password wasn't provided`, async () => {
        try {
            const requestBody = RequestBodyGenerator.getUserCredentialsWithoutPassword();
            apiLogger.info(`Sending request [POST] ${baseUrl}/register with body: \n${JSON.stringify(requestBody)}`);
            await axios.post(baseUrl + '/login', requestBody);
        } catch (error: any) {
            apiLogger.info(`The response is:\n${JSON.stringify(error.response.data)}`);
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe(missingPasswordMessage);
        }
    });
    it('Should get 404 error when trying to find nonexistent user', async () => {
        try {
            apiLogger.info(`Sending request [GET] ${baseUrl}/users/${nonExistUser}`);
            await axios.get(baseUrl + `/users/${nonExistUser}`);
        } catch (error: any) {
            apiLogger.info(`The response is:\n${JSON.stringify(error.response.data)}`);
            expect(error.response.status).toBe(404);
        }
    });
});
