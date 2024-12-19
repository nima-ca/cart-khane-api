import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/common/decorators/isPublic.decorator';
import { USER_KEY_IN_REQUEST } from 'src/common/decorators/user.decorator';
import { UserJWTPayload } from '../interface/jwt.interface';

const INVALID_TOKEN_MESSAGE = 'invalid token';
const EXPIRED_TOKEN_MESSAGE = 'token expired';
const FAILED_TOKEN_VALIDATION_MESSAGE = 'token verification failed';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;

        const isPublic = this.reflector.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (isPublic) {
            return true;
        }

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
        }

        const payload = await this.validateJWTToken(token);

        request[USER_KEY_IN_REQUEST] = payload;

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async validateJWTToken(token: string): Promise<UserJWTPayload> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('auth.jwt.secretKey'),
            });

            return payload;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException(EXPIRED_TOKEN_MESSAGE);
            }

            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException(INVALID_TOKEN_MESSAGE);
            }

            throw new UnauthorizedException(FAILED_TOKEN_VALIDATION_MESSAGE);
        }
    }
}
