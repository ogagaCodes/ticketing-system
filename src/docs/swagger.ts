import { eventSwaggerDoc } from './event.swagger';
import { bookingSwaggerDoc } from './booking.swagger';

export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Event Ticket Booking API',
    version: '1.0.0',
    description: 'API documentation for the Event Ticket Booking System',
  },
  servers: [
    {
      url: 'http://localhost:3000', // URL of your API
    },
  ],
  paths: {
    ...eventSwaggerDoc,
    ...bookingSwaggerDoc,
  },
};
