import { expect } from '@jest/globals';
import { RegistrationForm } from '../classes/registration_form';
import {
    ERROR_FOR_ALL_INVALID,
    fullInvalidRegistrationForm,
    negativeTestData,
    positiveTestData,
} from '../test-data/registration_form.test-data';
import { logger } from '../config/logger.config';

describe('Positive tests for registration form', () => {
    positiveTestData.forEach(({ testName, registrationFormData, expectedResult }, index) => {
        it(`${index + 1}. ${testName}`, () => {
            const validRegistrationForm = new RegistrationForm(
                registrationFormData.name,
                registrationFormData.surName,
                registrationFormData.email,
                registrationFormData.password,
                registrationFormData.age,
                registrationFormData.patronymic
            );
            logger.info(
                `Positive test ${index + 1}: Trying to validate registration form: \n ${JSON.stringify(
                    validRegistrationForm
                )}`
            );
            logger.info(`The result is: \n ${validRegistrationForm.validateParameters()}`);
            expect(validRegistrationForm.validateParameters()).toBe(expectedResult);
        });
    });
});

describe('Negative tests for registration form', () => {
    negativeTestData.forEach(({ testName, registrationFormData }, index) => {
        it(`${index + 1}. ${testName}`, () => {
            const invalidRegistrationForm = new RegistrationForm(
                registrationFormData.name,
                registrationFormData.surName,
                registrationFormData.email,
                registrationFormData.password,
                registrationFormData.age,
                registrationFormData.patronymic
            );
            logger.info(
                `Negative test ${index + 1}: Trying to validate registration form: \n ${JSON.stringify(
                    invalidRegistrationForm
                )}`
            );
            expect(() => {
                invalidRegistrationForm.validateParameters();
            }).toThrow('Incorrect');
        });
    });
    it(`Should throw multiply error message on the form with all invalid fields`, () => {
        expect(() => {
            fullInvalidRegistrationForm.validateParameters();
        }).toThrow(ERROR_FOR_ALL_INVALID);
    });
});
