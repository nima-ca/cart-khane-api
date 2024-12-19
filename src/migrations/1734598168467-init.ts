import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1734598168467 implements MigrationInterface {
    name = 'Init1734598168467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cards_cardtype_enum" AS ENUM('MySelf', 'Others')`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "digits" character varying(16) NOT NULL, "holderName" character varying(100) NOT NULL, "holderEmail" character varying(320) NOT NULL DEFAULT '', "holderPhoneNumber" character varying(15) NOT NULL DEFAULT '', "note" character varying(2000) NOT NULL DEFAULT '', "cardType" "public"."cards_cardtype_enum" NOT NULL, "userId" integer, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "firstName" character varying(100), "lastName" character varying(100), "phoneNumber" character varying NOT NULL, "otp" character varying(6), "otpSent" TIMESTAMP, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TYPE "public"."cards_cardtype_enum"`);
    }

}
