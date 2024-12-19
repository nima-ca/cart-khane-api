import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
    phoneNumber: string;
    firstName?: string;
    lastName?: string;
    otp?: string;
    otpSent?: Date;
}

export class UpdateUserInfoDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastName: string;
}
