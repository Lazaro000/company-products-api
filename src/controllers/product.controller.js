import { ProductSchema } from 'src/models/Product.js';

export const createProduct = async (req, res) => {
  const { name, category, price, imgUrl } = req.body;

  const newProduct = new ProductSchema({ name, category, price, imgUrl });

  const productSaved = await newProduct.save();

  return res.status(201).json(productSaved);
};

export const getProducts = async (req, res) => {
  const products = await ProductSchema.find();

  return res.json(products);
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductSchema.findById(id);

  return res.status(200).json(product);
};

export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const updatedProduct = await ProductSchema.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  await ProductSchema.findByIdAndDelete(id);

  return res.status(204).json();
};
