import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './configs/config';
import { AppDataSource } from './configs/orm';
import { UserModule } from './user/user.module';
import { CardModule } from './modules/card/card.module';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        TypeOrmModule.forRootAsync(AppDataSource),
        UserModule,
        CardModule,
    ],
})
export class AppModule {}
