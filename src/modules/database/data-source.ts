import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from '../roles/role.entity';
import { Doctor } from '../doctors/doctor.entity';
import { Service} from '../services/service.entity'
import { DoctorService } from '../doctorServices/doctor-services.entity';
import { Shift } from '../shifts/shifts.entity';
import { Appointment } from '../appointments/appointments.entity';
import { UserNotificationSetting } from '../user-notification-settings/users.notification-setting.entity';
import { MailHistory } from '../mail-history/mail-history.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123',
  database: 'clinic_db',
  entities: [
    User, Role, Doctor, Service, DoctorService, Shift, Appointment,UserNotificationSetting,MailHistory
  ],
  synchronize: false,
  migrations: ['src/migrations/*.ts'],
  migrationsRun: true,
});




