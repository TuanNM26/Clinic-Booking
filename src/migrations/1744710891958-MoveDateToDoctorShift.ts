import { MigrationInterface, QueryRunner } from "typeorm";

export class MoveDateToDoctorShift1744710891958 implements MigrationInterface {
    name = 'MoveDateToDoctorShift1744710891958'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "date" date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "date" date`);
    }

}
