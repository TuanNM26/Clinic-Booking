import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntity1744778896919 implements MigrationInterface {
    name = 'UpdateEntity1744778896919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "reason_cancled" TO "reason_canceled"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "status" character varying NOT NULL DEFAULT 'active'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ALTER COLUMN "date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "appointments" RENAME COLUMN "reason_canceled" TO "reason_cancled"`);
    }

}
