import { UserSchema } from '../models/User.js';
import { RoleSchema } from '../models/Role.js';

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const rolesFound = await RoleSchema.find({ name: { $in: roles } });

    // creating a new User
    const user = new UserSchema({
      username,
      email,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await UserSchema.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      roles: savedUser.roles,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getUsers = async (req, res) => {
  const users = await UserSchema.find();
  return res.json(users);
};

export const getUser = async (req, res) => {
  const user = await UserSchema.findById(req.params.id);
  return res.json(user);
};
