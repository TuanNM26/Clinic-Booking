import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddReasonCancelColumn1744777859783 implements MigrationInterface {
  name = 'AddReasonCancelColumn1744777859783';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "reason_cancled" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_shifts" ALTER COLUMN "date" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctor_shifts" ALTER COLUMN "date" DROP`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "reason_cancled"`,
    );
  }
}
