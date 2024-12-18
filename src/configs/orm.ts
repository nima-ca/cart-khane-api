import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your entities
    migrations: [__dirname + '/migrations/*{.ts,.js}'], // Path to your migrations
    synchronize: false, // Disable in production
    logging: true,
});
