import { DataSource } from 'typeorm';
import { User } from '../../../modules/users/entities/user.entity';
import { Role } from '../../../modules/roles/entities/role.entity';
import { Specialization } from '../../../modules/specializations/entities/specialization.entity';
import * as fs from 'fs';
import * as bcrypt from 'bcrypt';
import * as path from 'path';

export const seedUsers = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);
  const specializationRepository = dataSource.getRepository(Specialization);

  const filePath = path.resolve(__dirname, '../seed/data/user.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const users = JSON.parse(rawData);

  for (const user of users) {
    const { username, role_id, specialization_id, email } = user;
    const role = await roleRepository.findOne({ where: { id: role_id } });
    const specialization = await specializationRepository.findOne({
      where: { id: specialization_id },
    });

    if (!role) {
      console.warn(`Role with id ${role_id} not found.`);
      continue;
    }

    if (!specialization) {
      console.warn(`Specialization with id ${specialization_id} not found.`);
      continue;
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const newUser = userRepository.create({
        ...user,
        password: hashedPassword,
        role,
        specialization,
      });

      await userRepository.save(newUser);
      console.log(`User ${username} seeded successfully!`);
    } else {
      console.log(`User ${username} already exists, skipping.`);
    }
  }

  console.log('✅ Users seeded successfully.');
};
