import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './configs/config';
import { getDBCredentials } from './configs/orm';
import { AuthModule } from './modules/auth/auth.module';
import { CardModule } from './modules/card/card.module';
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
        UserModule,
        CardModule,
        AuthModule,
    ],
})
export class AppModule {}
