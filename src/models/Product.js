import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const schema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const ProductSchema = model('Product', schema);
