import { ConfigModuleOptions } from '@nestjs/config';
import { config } from 'dotenv';

const envPath =
    process.env.NODE_ENV === 'development'
        ? '.env.development'
        : '.env.production';

const configs = config({
    path: envPath,
}).parsed;

const configurations = () => ({
    port: parseInt(configs.PORT, 10) || 3000,
    frontEndDomain: configs.FRONT_END_DOMAIN,
    database: {
        host: configs.DB_HOST,
        name: configs.DB_DATABASE,
        user: configs.DB_USERNAME,
        password: configs.DB_PASSWORD,
        port: parseInt(configs.DB_PORT, 10) || 5432,
        sslMode: configs.DB_SSL_MODE === 'true',
    },

    auth: {
        jwt: {
            secretKey: configs.JWT_SECRET_KEY,
            expireIn: configs.JWT_EXPIRE,
        },

        sms: {
            key: configs.SMS_API_KEY,
        },
    },
});

export const configModuleOptions: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: envPath,
    load: [configurations],
};

export default configurations;
