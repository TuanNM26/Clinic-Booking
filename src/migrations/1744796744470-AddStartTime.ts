import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartTime1744796744470 implements MigrationInterface {
  name = 'AddStartTime1744796744470';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "start_time" TIME NOT NULL DEFAULT '00:00:00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."doctor_shifts_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "doctor_shifts" ADD "status" character varying NOT NULL DEFAULT 'active'`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_shifts" ALTER COLUMN "date" SET DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_shifts" ALTER COLUMN "date" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "start_time"`,
    );
  }
}
