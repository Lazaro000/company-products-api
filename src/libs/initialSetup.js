import { RoleSchema } from 'src/models/Role.js';

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
    console.error(err);
  }
};
