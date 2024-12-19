import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
    private algorithm = 'aes-256-cbc';
    constructor(private readonly configService: ConfigService) {}

    encrypt(data: string): string {
        const secretKey = this.configService.get<string>('auth.encryption.key');
        const secretIV = this.configService.get<string>('auth.encryption.iv');

        const cipher = crypto.createCipheriv(
            this.algorithm,
            secretKey,
            secretIV,
        );
        return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
    }

    decrypt(data: string): string {
        const secretKey = this.configService.get<string>('auth.encryption.key');
        const secretIV = this.configService.get<string>('auth.encryption.iv');

        const decipher = crypto.createDecipheriv(
            this.algorithm,
            secretKey,
            secretIV,
        );
        return decipher.update(data, 'hex', 'utf-8') + decipher.final('utf8');
    }
}
