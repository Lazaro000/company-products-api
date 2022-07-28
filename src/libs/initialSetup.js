import { RoleSchema } from 'src/models/Role.js';
import { UserSchema } from 'src/models/User.js';

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const createRoles = async () => {
  try {
    const count = await RoleSchema.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new RoleSchema({
        name: 'user',
      }).save(),
      new RoleSchema({
        name: 'moderator',
      }).save(),
      new RoleSchema({
        name: 'admin',
      }).save(),
    ]);

    console.log(values);
  } catch (err) {
    console.error(err.message);
  }
};

export const createAdmin = async () => {
  // check for an existing admin user
  const userFound = await UserSchema.findOne({
    email: process.env.ADMIN_EMAIL || 'admin@localhost',
  });
  console.log(userFound);
  if (userFound) return;

  // get roles _id
  const roles = await RoleSchema.find({
    name: { $in: ['admin', 'moderator'] },
  });

  // create a new admin user
  const newUser = await UserSchema.create({
    username: process.env.ADMIN_USERNAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@localhost',
    password: process.env.ADMIN_PASSWORD || 'admin',
    roles: roles.map((role) => role._id),
  });

  console.log(`New user created: ${newUser.email}`);
};
