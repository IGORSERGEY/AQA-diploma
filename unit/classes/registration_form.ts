import { regex } from '../helpers/constants';
import { ERROR_MESSAGES } from '../helpers/types';

export class RegistrationForm {
    constructor(
        public name: string,
        public surName: string,
        protected email: string,
        protected password: string,
        protected age: number,
        protected patronymic?: string
    ) {}

    public static readonly maxAge = 120;
    public static readonly minAge = 18;

    validateParameters(): string {
        const errorMessage: string[] = [];

        if (!regex.fullName.test(this.name)) {
            errorMessage.push(ERROR_MESSAGES.INVALID_NAME);
        }

        if (!regex.fullName.test(this.surName)) {
            errorMessage.push(ERROR_MESSAGES.INVALID_SURNAME);
        }

        if (!regex.email.test(this.email)) {
            errorMessage.push(ERROR_MESSAGES.INVALID_EMAIL);
        }

        if (!regex.password.test(this.password)) {
            errorMessage.push(ERROR_MESSAGES.INVALID_PASSWORD);
        }

        if (this.age < RegistrationForm.minAge || this.age > RegistrationForm.maxAge) {
            errorMessage.push(ERROR_MESSAGES.INVALID_AGE);
        }

        if (this.patronymic && !regex.fullName.test(this.patronymic)) {
            errorMessage.push(ERROR_MESSAGES.INVALID_PATRONYMIC);
        }

        if (errorMessage.length > 0) {
            throw new Error(errorMessage.join('\n'));
        }
        return 'Validation complete successful!';
    }
}
