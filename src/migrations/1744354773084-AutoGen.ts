import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGen1744354773084 implements MigrationInterface {
    name = 'AutoGen1744354773084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "dob" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "identity_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "appointment_date" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "appointment_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "identity_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "dob" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "email" DROP NOT NULL`);
    }

}
