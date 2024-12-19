import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
} from 'class-validator';
import { IR_PHONE_NUMBER_REGEX } from 'src/utils/regex';

export class CreateContactDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsEmail()
    @IsString()
    @IsOptional()
    @MaxLength(320)
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(15)
    @Matches(IR_PHONE_NUMBER_REGEX, { message: 'invalid phone number format' })
    phoneNumber: string;
}
