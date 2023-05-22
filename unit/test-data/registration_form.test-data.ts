import { expectedValidationResult } from '../helpers/constants';
import { RandomGenerator } from '../helpers/random_values_generator';
import { ERROR_MESSAGES } from '../helpers/types';

export const ERROR_FOR_ALL_INVALID = `${ERROR_MESSAGES.INVALID_NAME}\n${ERROR_MESSAGES.INVALID_SURNAME}\n${ERROR_MESSAGES.INVALID_EMAIL}\n${ERROR_MESSAGES.INVALID_PASSWORD}\n${ERROR_MESSAGES.INVALID_AGE}\n${ERROR_MESSAGES.INVALID_PATRONYMIC}`;
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
        testName: 'The "Patronymic" field is not provided',
        registrationFormData: {
            name: RandomGenerator.shortValidFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
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
        testName: 'Empty fields',
        registrationFormData: {
            name: '',
            surName: '',
            email: '',
            password: '',
            age: 1,
            patronymic: '1',
        },
    },
    {
        testName: 'The name contains digits',
        registrationFormData: {
            name: 'Igor123',
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
    },
    {
        testName: 'The incorrect email',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: '123123@',
            password: RandomGenerator.validPassword,
            age: RandomGenerator.validAge,
            patronymic: RandomGenerator.validFullName,
        },
    },
    {
        testName: 'The age is 17',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.validPassword,
            age: 17,
            patronymic: RandomGenerator.validFullName,
        },
    },
    {
        testName: 'The age is 121',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.shortInvalidPassword,
            age: 121,
            patronymic: RandomGenerator.validFullName,
        },
    },
    {
        testName: 'The password length is 7 symbols',
        registrationFormData: {
            name: RandomGenerator.validFullName,
            surName: RandomGenerator.validFullName,
            email: RandomGenerator.validEmail,
            password: RandomGenerator.shortInvalidPassword,
            age: 25,
            patronymic: RandomGenerator.validFullName,
        },
    },
];

