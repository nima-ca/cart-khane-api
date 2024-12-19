import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOTPDto, ValidateOTPDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('otp')
    sendOTP(@Body() dto: SendOTPDto) {
        return this.authService.sendOTP(dto);
    }

    @Post('otp/verification')
    validateOTP(@Body() dto: ValidateOTPDto) {
        return this.authService.validateOTP(dto);
    }
}
