import { MigrationInterface, QueryRunner } from "typeorm";

export class Avatar1736082195089 implements MigrationInterface {
    name = 'Avatar1736082195089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD "avatarId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "avatarId"`);
    }

}
