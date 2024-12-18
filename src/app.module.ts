import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './configs/config';
import { AppDataSource } from './configs/orm';

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        TypeOrmModule.forRootAsync(AppDataSource),
    ],
})
export class AppModule {}
