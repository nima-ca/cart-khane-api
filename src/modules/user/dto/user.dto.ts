export class CreateUserDto {
    phoneNumber: string;
    firstName?: string;
    lastName?: string;
    otp?: string;
    otpSent?: Date;
}
