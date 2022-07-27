import cors from 'cors';
import { config as dotenvConfig } from 'dotenv';
import express from 'express';
import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';

dotenvConfig();

export const bootstrap = async () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

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
    console.log(`🚀 Server ready at ${process.env.PORT}`)
  );
};
