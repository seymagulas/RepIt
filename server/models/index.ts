import mongoose, { ConnectOptions } from 'mongoose';
import { config } from './config';

const { dbName, dbHost, dbPort } = config;

mongoose
  .connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

export default mongoose;
