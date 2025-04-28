import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDoctorShiftsCompositeKeyWithDate1745294026689 implements MigrationInterface {
  name = 'UpdateDoctorShiftsCompositeKeyWithDate1745294026689'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP CONSTRAINT "PK_531d465137f8fe13294df607c14"`);
    await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD CONSTRAINT "PK_doctor_shift_date" PRIMARY KEY ("doctor_id", "shift_id", "date")`);
    await queryRunner.query(`ALTER TABLE "doctor_shifts" ALTER COLUMN "date" SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP CONSTRAINT "PK_doctor_shift_date"`);
    await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD CONSTRAINT "PK_531d465137f8fe13294df607c14" PRIMARY KEY ("doctor_id", "shift_id")`);
  }
}
