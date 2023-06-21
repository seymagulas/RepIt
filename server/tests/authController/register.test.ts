import dotenv from 'dotenv';
import request from 'supertest';
import Koa from 'koa';
import mongoose, { ConnectOptions, connect, disconnect, createConnection } from 'mongoose';
import { router } from '../../router';
import { UserModel } from '../../models/userModel';
import { app } from '../../index';

dotenv.config();

describe('/register endpoint', () => {
  let isConnected: boolean = false; // Track connection status

  beforeAll(async () => {
    // Connect to the test database
    if (!process.env.TEST_MONGODB_URI) {
      throw new Error('TEST_MONGODB_URI environment variable not defined');
    }

    // Make sure `mongoose.connect()` is only called once
    if (!isConnected) {
      createConnection(process.env.TEST_MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      isConnected = true; // Connection established
    }
  });

  afterEach(async () => {
    // Clear the UserModel collection after each test
    await UserModel.deleteMany({});
  });

  afterAll(async () => {
    // Disconnect from the test database
    await UserModel.deleteMany({});
    await disconnect();
    mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      name: 'John Doe',
    };

    const response = await request(app.callback())
      .post('/register')
      .send(userData);

    const user = await UserModel.findOne({ email: userData.email });
    expect(user).toBeTruthy();
    expect(user!.name).toBe(userData.name);
    expect(response.status).toBe(201);
  });

  it('should return 422 if user already exists', async () => {
    const existingUser = {
      email: 'existing@example.com',
      password: 'existing123',
      confirmPassword: 'existing123',
      name: 'Existing User',
    };

    await UserModel.create(existingUser);

    const response = await request(app.callback())
      .post('/register')
      .send(existingUser);

    expect(response.body.message).toBe('User already exists, please login.');
    expect(response.status).toBe(422);
  });

  it('should return 422 if password is empty', async () => {
    const userData = {
      email: 'test@example.com',
      password: '',
      confirmPassword: '',
      name: 'John Doe',
    };

    const response = await request(app.callback())
      .post('/register')
      .send(userData);

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Password cannot be empty.');
  });

  it('should return 422 if passwords do not match', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'differentpassword',
      name: 'John Doe',
    };

    const response = await request(app.callback())
      .post('/register')
      .send(userData);

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Passwords do not match.');
  });
});
