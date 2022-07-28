import { UserSchema } from 'src/models/User.js';
import jwt from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
import { RoleSchema } from 'src/models/Role.js';

dotenvConfig();

export const signUp = async (req, res) => {
  const { username, email, password, roles } = req.body;

  const newUser = new UserSchema({
    username,
    email,
    password: await UserSchema.encryptPassword(password),
  });

  if (roles) {
    const foundRoles = await RoleSchema.find({ name: { $in: roles } });

    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await RoleSchema.findOne({ name: 'user' });

    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: 86400, // 24 hours
  });

  return res.status(200).json({ token });
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await UserSchema.findOne({
    email,
  }).populate('roles');

  if (!userFound) return res.status(400).json({ message: 'User not found' });

  const matchPassword = await UserSchema.comparePassword(
    password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: 'Invalid password' });

  const token = jwt.sign(
    {
      id: userFound._id,
    },
    process.env.JWT_PRIVATE_KEY,
    {
      expiresIn: 86400,
    }
  );

  return res.json({ token });
};
