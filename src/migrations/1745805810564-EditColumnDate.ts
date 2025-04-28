import { MigrationInterface, QueryRunner } from "typeorm";

export class EditColumnDate1745805810564 implements MigrationInterface {
    name = 'EditColumnDate1745805810564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "appointments" SET "reason_canceled" = '' WHERE "reason_canceled" IS NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "UQ_25d24010f53bb80b78e412c9656"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_64c787dc722a5e6856df47f45a1"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY ("role_id", "permission_id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."doctor_shifts_status_enum" AS ENUM('active', 'cancelled')`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "status" "public"."doctor_shifts_status_enum" NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "start_time" DROP DEFAULT`);
        await queryRunner.query(`CREATE INDEX "IDX_178199805b901ccd220ab7740e" ON "role_permissions" ("role_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_17022daf3f885f7d35423e9971" ON "role_permissions" ("permission_id") `);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17022daf3f885f7d35423e9971"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_178199805b901ccd220ab7740e"`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "start_time" SET DEFAULT '00:00:00'`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "reason_canceled" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."doctor_shifts_status_enum"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "status" character varying NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ALTER COLUMN "date" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "PK_25d24010f53bb80b78e412c9656"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "PK_64c787dc722a5e6856df47f45a1" PRIMARY KEY ("role_id", "permission_id", "id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "UQ_25d24010f53bb80b78e412c9656" UNIQUE ("role_id", "permission_id")`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
