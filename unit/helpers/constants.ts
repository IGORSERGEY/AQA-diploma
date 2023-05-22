export const regex = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@$!%^*?&])[A-Za-z0-9@$!%+^*?&]{8,32}$/,
    fullName: /^[A-Za-z]{1,32}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[^\s|\d@]{2,4}$/,
};
export const expectedValidationResult = 'Validation complete successful!';