import { regex } from '../helpers/constants';

export class RegistrationForm {
    constructor(
        public name: string,
        public surName: string,
        protected email: string,
        protected password: string,
        protected age: number,
        protected patronymic?: string
    ) {}
    validateParameters(): void {
        const errorMessage: string[] = [];

        if (!regex.fullName.test(this.name)) {
            errorMessage.push('Incorrect name! Only alphabetic characters are allowed');
        }

        if (!regex.fullName.test(this.surName)) {
            errorMessage.push('Incorrect surname! Only alphabetic characters are allowed');
        }

        if (!regex.email.test(this.email)) {
            errorMessage.push('Incorrect email!');
        }

        if (!regex.password.test(this.password)) {
            errorMessage.push(
                'Incorrect password! The password must contain at least 8 characters, including numbers, lowercase and uppercase letters.'
            );
        }

        if (this.age <= 18 || this.age >= 120) {
            errorMessage.push('Incorrect age! Age must be a number between 18 and 120 years');
        }

        if (this.patronymic && !regex.fullName.test(this.patronymic)) {
            errorMessage.push('Incorrect patronymic! Only alphabetic characters are allowed.');
        }

        if (errorMessage.length > 0) {
            throw new Error(errorMessage.join('\n'));
        }
    }
}
