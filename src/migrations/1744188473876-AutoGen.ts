import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGen1744188473876 implements MigrationInterface {
    name = 'AutoGen1744188473876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shifts" DROP CONSTRAINT "FK_97c55f53eb334539ca2399c3d8c"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_01733651151c8a1d6d980135cc4"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_0c1af27b469cb8dca420c160d65"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_f77953c373efb8ab146d98e90c3"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_12018699e59ec07fa2cd314fc26"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_03cf94e84a7d01adbf2369e802e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, CONSTRAINT "UQ_48ce552495d14eae9b187bb6716" UNIQUE ("name"), CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("role_id" uuid NOT NULL, "permission_id" uuid NOT NULL, CONSTRAINT "PK_25d24010f53bb80b78e412c9656" PRIMARY KEY ("role_id", "permission_id"))`);
        await queryRunner.query(`CREATE TABLE "doctor_shifts" ("doctor_id" uuid NOT NULL, "shift_id" uuid NOT NULL, "assigned_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_531d465137f8fe13294df607c14" PRIMARY KEY ("doctor_id", "shift_id"))`);
        await queryRunner.query(`CREATE TABLE "specializations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text, "price" numeric(10,2) NOT NULL, CONSTRAINT "UQ_68ccfdea9eca4570f9aa5454b25" UNIQUE ("name"), CONSTRAINT "PK_1d4b2b9ff96a76def0bf7195a8f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "shifts" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "serviceId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "shiftId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "canceledById"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roleId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deletedBy"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "dob" date`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "identity_number" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "doctor_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "shift_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "specialized_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "full_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gender" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "specialization_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "users" ADD "experience_years" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "appointment_date" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dob" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_178199805b901ccd220ab7740ec" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_17022daf3f885f7d35423e9971e" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD CONSTRAINT "FK_a4a795dca2ff99a71ef436bbb5d" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" ADD CONSTRAINT "FK_d8db309136ceeb8135b16194c52" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_4cf26c3f972d014df5c68d503d2" FOREIGN KEY ("doctor_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_7350602f41e3660d68eba4c6461" FOREIGN KEY ("shift_id") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_27c2099d0fe70c9c4827cce3717" FOREIGN KEY ("specialized_id") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_34c87782de317e88ef117a20dc0" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_34c87782de317e88ef117a20dc0"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_27c2099d0fe70c9c4827cce3717"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_7350602f41e3660d68eba4c6461"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_4cf26c3f972d014df5c68d503d2"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP CONSTRAINT "FK_d8db309136ceeb8135b16194c52"`);
        await queryRunner.query(`ALTER TABLE "doctor_shifts" DROP CONSTRAINT "FK_a4a795dca2ff99a71ef436bbb5d"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_17022daf3f885f7d35423e9971e"`);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_178199805b901ccd220ab7740ec"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "dob" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone_number" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(512) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ALTER COLUMN "appointment_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "name" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "experience_years"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "specialization_id"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "specialized_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "shift_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "doctor_id"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "identity_number"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "gender"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "canceledById" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "shiftId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "serviceId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deletedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdBy" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "specializations"`);
        await queryRunner.query(`DROP TABLE "doctor_shifts"`);
        await queryRunner.query(`DROP TABLE "role_permissions"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_03cf94e84a7d01adbf2369e802e" FOREIGN KEY ("canceledById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_12018699e59ec07fa2cd314fc26" FOREIGN KEY ("shiftId") REFERENCES "shifts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_f77953c373efb8ab146d98e90c3" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_0c1af27b469cb8dca420c160d65" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_01733651151c8a1d6d980135cc4" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shifts" ADD CONSTRAINT "FK_97c55f53eb334539ca2399c3d8c" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
