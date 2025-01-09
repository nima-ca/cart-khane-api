import { MigrationInterface, QueryRunner } from "typeorm";

export class CardCascade1736466425750 implements MigrationInterface {
    name = 'CardCascade1736466425750'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_dc10f779b49977def25e7aa89a6"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_dc10f779b49977def25e7aa89a6" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_dc10f779b49977def25e7aa89a6"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_dc10f779b49977def25e7aa89a6" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
