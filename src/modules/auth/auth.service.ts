import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SendOTPDto } from './dto/auth.dto';
import { OTPService } from './otp.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly otpService: OTPService,
        private readonly userService: UserService,
    ) {}

    async sendOTP(dto: SendOTPDto) {
        const user = await this.userService.findByPhoneNumber(dto.phoneNumber);

        const otp = this.otpService.generateOTP();

        if (!user) {
            await this.userService.create({
                otp,
                otpSent: new Date(),
                phoneNumber: dto.phoneNumber,
            });

            await this.otpService.send(dto.phoneNumber, otp);
            return;
        }

        const validityDurationMinutes = 2; // OTP valid for 2 minutes
        const isLastOTPExpired = this.otpService.isOTPExpired(
            user.otpSent.toISOString(),
            validityDurationMinutes,
        );

        if (!isLastOTPExpired) {
            throw new BadRequestException(
                'برای دریافت کد یکبار مصرف جدید باید 2 دقیقه صبر کنید',
            );
        }

        await this.otpService.send(dto.phoneNumber, otp);
        await this.userService.updateOTPSentTime(user.id);
    }
}
