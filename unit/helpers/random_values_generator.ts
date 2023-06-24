import RandExp from 'randexp';
import { RegistrationForm } from '../classes/registration_form';

const maxAge = RegistrationForm.maxAge;
const minAge = RegistrationForm.minAge;

export class RandomGenerator {
    static get validFullName() {
        return new RandExp(/^[A-Za-z]{1,32}$/).gen();
    }
    static get validEmail() {
        return new RandExp(/^[\w-\.]{1,16}@([\w-]{1,16}\.)[^\s|\d@]{2,4}$/).gen();
    }
    static get validPassword() {
        return new RandExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@$!%^*?&])(1)[A-Za-z0-9@$!%+^*?&]{8,31}$/
        ).gen();
    }
    static get validAge() {
        return Math.floor(Math.random() * (maxAge - minAge) + minAge);
    }
    static get longValidFullName() {
        return new RandExp(/^[A-Za-z]{32}$/).gen();
    }
    static get shortValidFullName() {
        return new RandExp(/^[A-Za-z]{1}$/).gen();
    }
    static get longValidPassword() {
        return new RandExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@$!%^*?&])(1)[A-Za-z0-9@$!%+^*?&]{31}$/
        ).gen();
    }
    static get shortValidPassword() {
        return new RandExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@$!%^*?&])(1)[A-Za-z0-9@$!%+^*?&]{7}$/
        ).gen();
    }
    static get shortInvalidPassword() {
        return new RandExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[A-Za-z0-9@$!%^*?&])(1)[A-Za-z0-9@$!%+^*?&]{6}$/
        ).gen();
    }
}
