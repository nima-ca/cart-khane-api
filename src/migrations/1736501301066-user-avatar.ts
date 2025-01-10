import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAvatar1736501301066 implements MigrationInterface {
    name = 'UserAvatar1736501301066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "avatarId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatarId"`);
    }

}
