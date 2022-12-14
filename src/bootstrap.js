import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import morgan from 'morgan';
import pkg from '../package.json';
import { createAdmin, createRoles } from './libs/initialSetup.js';
import { authRoutes } from './routes/auth.routes.js';
import { productRoutes } from './routes/product.routes.js';
import { userRoutes } from './routes/user.routes.js';

dotenvConfig();

export const bootstrap = async () => {
  const app = express();

  // Setup
  createRoles();
  createAdmin();

  // Settings
  app.set('pkg', pkg);

  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cors());

  // Welcome route
  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to my Products API',
      name: app.get('pkg').name,
      author: app.get('pkg').author,
      description: app.get('pkg').description,
      version: app.get('pkg').version,
    });
  });

  // Routes
  app.use('/products', productRoutes);
  app.use('/auth', authRoutes);
  app.use('/users', userRoutes);

  const mongo = await MongoMemoryReplSet.create({
    replSet: {
      count: 1,
      dbName: 'company',
    },
  });

  process.env.MONGODB_URI = mongo.getUri();

  await mongoose.connect(process.env.MONGODB_URI, {
    connectTimeoutMS: 4000,
  });

  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
  );
};
