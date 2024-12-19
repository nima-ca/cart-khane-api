import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { VALIDITY_DURATION_MINUTES } from 'src/constants/otp';
import { UserService } from '../user/user.service';
import { SendOTPDto, ValidateOTPDto } from './dto/auth.dto';
import { OTPService } from './otp.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
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

        const isLastOTPExpired = this.otpService.isOTPExpired(
            user.otpSent.toISOString(),
            VALIDITY_DURATION_MINUTES,
        );

        if (!isLastOTPExpired) {
            throw new BadRequestException(
                'برای دریافت کد یکبار مصرف جدید باید 2 دقیقه صبر کنید',
            );
        }

        await this.otpService.send(dto.phoneNumber, otp);
        await this.userService.updateOTP(user.id, otp, true);
    }

    async validateOTP(dto: ValidateOTPDto) {
        const user = await this.userService.findByPhoneNumber(dto.phoneNumber);

        if (!user) {
            throw new BadRequestException('کد یکبار مصرف نادرست است');
        }

        if (
            this.otpService.isOTPExpired(
                user.otpSent.toISOString(),
                VALIDITY_DURATION_MINUTES,
            )
        ) {
            throw new BadRequestException('کد یکبار مصرف منقضی شده است');
        }

        if (user.otp !== dto.otp) {
            throw new BadRequestException('کد یکبار مصرف نادرست است');
        }

        await this.userService.updateOTP(user.id, '', false);
        const jwtToken = await this.generateUserToken(user.id);

        return { token: jwtToken };
    }

    private async generateUserToken(userId: number): Promise<string> {
        return this.jwtService.signAsync({ sub: userId });
    }
}
