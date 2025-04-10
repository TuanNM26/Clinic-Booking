import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGen1744255342050 implements MigrationInterface {
    name = 'AutoGen1744255342050'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "specializations" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedBy" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "specializations" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "specializations" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "specializations" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "specializations" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "specializations" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "specializations" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "createdAt"`);
    }

}
