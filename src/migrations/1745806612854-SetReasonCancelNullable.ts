import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetReasonCancelNullable1745806612854
  implements MigrationInterface
{
  name = 'SetReasonCancelNullable1745806612854';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" SET NOT NULL`,
    );
  }
}
