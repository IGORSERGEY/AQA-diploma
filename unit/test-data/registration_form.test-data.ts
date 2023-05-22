import { expectedValidationResult } from '../helpers/constants';
import { RandomGenerator } from '../helpers/random_values_generator';

export const positiveTestData = [
    {
        testName: 'All fields are valid',
        registrationFormData: {
            name: 'Igor',
            surName: 'Sergey',
            email: 'example@ex.com',
            password: '123Qwerty',
            age: 18,
            patronymic: 'Dmitrievich',
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'All fields are random',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'The "name" field length is 1 letter',
        registrationFormData: {
            name: RandomGenerator.shortValidFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'The "surName" field length is 1 letter',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.shortValidFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'The "surName" field length is 32 letters',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.longValidFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'The "name" field length is 32 letters',
        registrationFormData: {
            name: RandomGenerator.longValidFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'The "password" field is 8 symbols',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.shortValidPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
    {
        testName: 'The "password" field is 32 symbols',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.longValidPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
        expectedResult: expectedValidationResult,
    },
];
export const negativeTestData = [
    {
        testName: '',
        registrationFormData: {
            name: '',
            surName: '',
            email: '',
            password: '',
            age: 1,
            patronymic: '',
        },
        expectedResult: '',
    },
];
