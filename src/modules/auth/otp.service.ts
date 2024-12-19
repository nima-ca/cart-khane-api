import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { DateTime } from 'luxon';

@Injectable()
export class OTPService {
    constructor(private readonly configService: ConfigService) {}

    async send(phoneNumber: string, message: string) {
        const key = this.configService.get<string>('auth.sms.key');
        try {
            await axios.get(
                `https://api.kavenegar.com/v1/${key}/verify/lookup.json`,
                {
                    params: {
                        receptor: phoneNumber,
                        token: message,
                        template: 'cartkhane',
                    },
                },
            );
        } catch {
            throw new InternalServerErrorException(
                'خطا در ارسال کد یکبار مصرف',
            );
        }
    }

    isOTPExpired(
        otpSentTime: string,
        validityDurationInMinutes: number,
    ): boolean {
        const sentTime = DateTime.fromISO(otpSentTime); // Parse the OTP sent time
        const expirationTime = sentTime.plus({
            minutes: validityDurationInMinutes,
        }); // Calculate expiration time
        const now = DateTime.now(); // Get the current time
        return now > expirationTime; // Check if current time is past expiration
    }

    generateOTP(length: number = 6): string {
        const min = Math.pow(10, length - 1); // Minimum value for the given length
        const max = Math.pow(10, length) - 1; // Maximum value for the given length
        const otp = Math.floor(Math.random() * (max - min + 1)) + min; // Generate random number
        return otp.toString();
    }
}
