import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBaseEntityFields1743403157754 implements MigrationInterface {
  name = 'AddBaseEntityFields1743403157754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "roles" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "roles" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "doctors" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "doctors" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "services" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "services" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "shifts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "shifts" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "shifts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "shifts" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "shifts" ADD "deletedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "shifts" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" ADD "deletedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" ADD "createdBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" ADD "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" ADD "deletedBy" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "mail_history" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "mail_history" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_notification_settings" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "doctor_services" DROP COLUMN "deletedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" DROP COLUMN "updatedBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" DROP COLUMN "createdBy"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctor_services" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deletedBy"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedBy"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdAt"`);
  }
}
