import { baseUrl, maxUserId, missingPasswordMessage, nonExistUser, usersPage } from '../test-data/constants';
import { validateSchema } from '../helpers/schema_validator';
import * as userListSchema from '../schema/user_list_schema.json';
import * as userSchema from '../schema/user_schema.json';
import * as registrationResponseSchema from '../schema/registration_response_schema.json';
import { RequestBodyGenerator, randomUserIdNumber } from '../helpers/request_body_generator';
import { reqres } from '../config/axios.config';

describe('Positive API tests for reqres.in', () => {
    const userId = randomUserIdNumber;

    it('Should get users list', async () => {
        const params = {
            page: usersPage,
            per_page: maxUserId,
        };
        let response = await reqres.get('/users', {
            params,
        });
        expect(response.status).toBe(200);
        validateSchema(userListSchema, response.data);
        expect(response.data.per_page).toBe(maxUserId);
        expect(response.data.page).toBe(usersPage);
    });

    it('Should create user', async () => {
        const requestBody = RequestBodyGenerator.getUserToCreate();
        let response = await reqres.post(baseUrl + '/users', requestBody);

        expect(response.status).toBe(201);
        expect(response.data).toMatchObject(requestBody);
    });
    it(`Should find user №${userId} by id`, async () => {
        let response = await reqres.get(baseUrl + `/users/${userId}`);

        expect(response.data.data.id).toBe(userId);
        validateSchema(userSchema, response.data);
    });
    it(`Should update user №${userId}`, async () => {
        const requestBody = RequestBodyGenerator.getUserForUpdate(userId);
        let response = await reqres.put(baseUrl + `/users/${userId}`, requestBody);

        expect(response.status).toBe(200);
        validateSchema(userSchema, response.data);
        expect(response.data.data.id).toBe(userId);
        expect(response.data).toMatchObject(requestBody);
    });
    it(`Should update user's №${userId} email`, async () => {
        let responseBefore = await reqres.get(baseUrl + `/users/${userId}`);
        const requestBody = RequestBodyGenerator.getUserForUpdate(userId);
        let responseAfter = await reqres.patch(baseUrl + `/users/${userId}`, requestBody);

        expect(responseAfter.status).toBe(200);
        validateSchema(userSchema, responseAfter.data);
        expect(responseAfter.data.data.id).toBe(userId);
        expect(responseAfter.data).toMatchObject(requestBody);
    });

    it(`Should delete user №${userId}`, async () => {
        let response = await reqres.delete(baseUrl + `/users/${userId}`);
        expect(response.status).toBe(204);
    });
    it('Should register a user', async () => {
        const requestBody = RequestBodyGenerator.getUserCredentials();
        let response = await reqres.post(baseUrl + '/register', requestBody);
        expect(response.status).toBe(200);
        validateSchema(registrationResponseSchema, response.data);
    });
});
describe('Negative tests for reqres.in', () => {
    it(`Registration: Should give an error '${missingPasswordMessage}' when password wasn't provided`, async () => {
        try {
            const requestBody = RequestBodyGenerator.getUserCredentialsWithoutPassword();
            await reqres.post(baseUrl + '/register', requestBody);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe(missingPasswordMessage);
        }
    });
    it(`Login: Should give an error '${missingPasswordMessage}' when password wasn't provided`, async () => {
        try {
            const requestBody = RequestBodyGenerator.getUserCredentialsWithoutPassword();
            await reqres.post(baseUrl + '/login', requestBody);
        } catch (error: any) {
            expect(error.response.status).toBe(400);
            expect(error.response.data.error).toBe(missingPasswordMessage);
        }
    });
    it('Should get 404 error when trying to find nonexistent user', async () => {
        try {
            await reqres.get(baseUrl + `/users/${nonExistUser}`);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }
    });
});
