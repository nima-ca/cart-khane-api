import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOTPDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('otp')
    sendOTP(@Body() dto: SendOTPDto) {
        return this.authService.sendOTP(dto);
    }
}
