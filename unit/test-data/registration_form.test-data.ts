export const positiveTestData = [
    {
        testName: 'All fields are valid',
        registrationFormData: {
            name: 'Igor',
            surName: 'Sergey',
            email: 'example@ex.com',
            password: '123Qwerty$$',
            age: 18,
            patronymic: 'Dmitrievich',
        },
        expectedResult: 'Validation complete successful!',
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
