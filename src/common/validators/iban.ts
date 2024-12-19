import { isShebaValid } from '@persian-tools/persian-tools';
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsIBAN implements ValidatorConstraintInterface {
    validate(value: string) {
        return isShebaValid(value);
    }

    defaultMessage(): string {
        return 'invalid iban format';
    }
}
