import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './configs/config';
import { getDBCredentials } from './configs/orm';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
import { ContactModule } from './modules/contact/contact.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { EncryptionService } from './modules/encryption/encryption.service';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        TypeOrmModule.forRoot({
            type: 'postgres',
            ...getDBCredentials(),
            synchronize: false,
            entities: ['dist/**/*.entity{.ts,.js}'],
        }),
        EncryptionModule,
        UserModule,
        CardModule,
        AuthModule,
        ContactModule,
    ],
    providers: [EncryptionService],
})
export class AppModule {}
