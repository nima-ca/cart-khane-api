import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OTPService } from './otp.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [AuthService, OTPService],
})
export class AuthModule {}
