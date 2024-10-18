require('dotenv').config();
import logger from './logger';
import { DataSource } from 'typeorm';
import { Event } from '../modules/events/entities/event.entity';
import { Booking } from '../modules/booking/entities/booking.entity';
import { WaitingList } from '../modules/booking/entities/waitingList.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,  // Disable in production
  logging: false,
  entities: [Event, Booking, WaitingList],
  migrations: [],
  subscribers: [],
});

// Initialize the connection
export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connected successfully');
  } catch (error) {
    logger.error('Error during Data Source initialization:', error);
    throw error;
  }
};
