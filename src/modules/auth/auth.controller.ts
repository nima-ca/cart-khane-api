import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/isPublic.decorator';
import { AuthService } from './auth.service';
import { SendOTPDto, ValidateOTPDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('otp')
    async sendOTP(@Body() dto: SendOTPDto) {
        return await this.authService.sendOTP(dto);
    }

    @Public()
    @Post('otp/verification')
    async validateOTP(@Body() dto: ValidateOTPDto) {
        return await this.authService.validateOTP(dto);
    }
}
