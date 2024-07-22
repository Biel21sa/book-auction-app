import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsernameColumn1721393905813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" ADD COLUMN "username" varchar NOT NULL DEFAULT 'defaultUserName'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user" DROP COLUMN "username"
    `);
  }
}
