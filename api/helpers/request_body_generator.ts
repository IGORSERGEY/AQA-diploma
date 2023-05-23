import RandExp from 'randexp';
import { maxUserId, minUserId } from '../test-data/constants';

const randomString = new RandExp(/^[A-Za-z]{1,32}$/);
export const randomUserIdNumber = Math.floor(Math.random() * (maxUserId - minUserId) + minUserId);

export class RequestBodyGenerator {
    constructor() {}
    static getUserToCreate() {
        return {
            name: randomString.gen(),
            job: randomString.gen(),
        };
    }
    static getUserCredentials() {
        return {
            email: 'eve.holt@reqres.in',
            password: 'pistol',
        };
    }
    static getUserCredentialsWithoutPassword() {
        return {
            email: 'eve.holt@reqres.in',
        };
    }
    static getUserForUpdate(userId?: number) {
        return {
            data: {
                id: userId ? userId : randomUserIdNumber,
                email: `${randomString.gen()}@reqres.in`,
                first_name: randomString.gen(),
                last_name: randomString.gen(),
                avatar: 'https://reqres.in/img/faces/3-image.jpg',
            },
        };
    }
}
