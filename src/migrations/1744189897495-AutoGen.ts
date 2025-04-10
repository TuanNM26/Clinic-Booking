import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGen1744189897495 implements MigrationInterface {
    name = 'AutoGen1744189897495'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "identify_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "identify_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "address"`);
    }

}
