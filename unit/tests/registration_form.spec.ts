import { expect } from '@jest/globals';
import { RegistrationForm } from '../classes/registration_form';
import { positiveTestData } from '../test-data/registration_form.test-data';

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
            expect(validRegistrationForm.validateParameters()).toBe(expectedResult);
        });
    });
});

// describe('Negative tests for registration form', () => {
//     it('Should accept valid values', () => {
//         const rf = new RegistrationForm('Ig12or', '', 'example@ex.com', 'Pa$$w0rd', 25, 'Dmitrievich');
//         expect(() => {
//             rf.validateParameters();
//         }).toThrow('name');
//     });
// });
