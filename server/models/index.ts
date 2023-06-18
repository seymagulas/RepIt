const mongoose = require('mongoose');
import { config } from "./config";

mongoose.connect(
  `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`, 
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

export default mongoose;
