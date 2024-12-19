import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/isPublic.decorator';
import { AuthService } from './auth.service';
import { SendOTPDto, ValidateOTPDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('otp')
    sendOTP(@Body() dto: SendOTPDto) {
        return this.authService.sendOTP(dto);
    }

    @Public()
    @Post('otp/verification')
    validateOTP(@Body() dto: ValidateOTPDto) {
        return this.authService.validateOTP(dto);
    }
}
