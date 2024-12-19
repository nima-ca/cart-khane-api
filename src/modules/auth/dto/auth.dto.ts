import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { IR_PHONE_NUMBER_REGEX } from 'src/utils/regex';

export class SendOTPDto {
    @IsString()
    @IsNotEmpty()
    @Matches(IR_PHONE_NUMBER_REGEX, { message: 'invalid phone number format' })
    phoneNumber: string;
}

export class ValidateOTPDto {
    @IsString()
    @IsNotEmpty()
    @Matches(IR_PHONE_NUMBER_REGEX, { message: 'invalid phone number format' })
    phoneNumber: string;

    @IsString()
    @Length(6, 6)
    otp: string;
}
