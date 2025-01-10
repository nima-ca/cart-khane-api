import {
    IsInt,
    IsNotEmpty,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateUserDto {
    phoneNumber: string;
    firstName?: string;
    lastName?: string;
    otp?: string;
    otpSent?: Date;
    avatarId?: number;
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

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(100)
    avatarId: number;
}
