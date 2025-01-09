import { verifyCardNumber } from '@persian-tools/persian-tools';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCreditCard implements ValidatorConstraintInterface {
    validate(value: number) {
        return verifyCardNumber(+value);
    }

    defaultMessage(): string {
        return 'invalid credit card format';
    }
}
