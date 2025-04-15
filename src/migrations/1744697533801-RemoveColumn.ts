import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveColumn1744697533801 implements MigrationInterface {
    name = 'RemoveColumn1744697533801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."shifts_status_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."appointments_status_enum_old" AS ENUM('pending', 'confirmed', 'cancelled', 'completed')`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "status" TYPE "public"."appointments_status_enum_old" USING "status"::"text"::"public"."appointments_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."appointments_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."appointments_status_enum_old" RENAME TO "appointments_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."shifts_status_enum" AS ENUM('available', 'booked', 'completed')`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "status" "public"."shifts_status_enum" NOT NULL DEFAULT 'available'`);
    }

}
