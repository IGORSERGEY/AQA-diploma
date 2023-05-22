export const regex = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()_+]{8,32}$/,
    fullName: /^[A-Za-z]{1,32}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
