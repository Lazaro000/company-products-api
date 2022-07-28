import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const ROLES = ['user', 'admin', 'moderator'];

const schema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export const RoleSchema = model('Role', schema);
