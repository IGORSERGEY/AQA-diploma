export const regex = {
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
    fullName: /^[A-Za-z]+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};
