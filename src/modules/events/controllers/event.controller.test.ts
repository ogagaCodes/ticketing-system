import request from 'supertest';
import express from 'express';
import { EventController } from './event.controller';
import { EventService } from '../services/event.service';
import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event.entity'; // Import the Event entity

jest.mock('../services/event.service');
jest.mock('../repositories/event.repository');

describe('EventController', () => {
  let app: express.Application;
  let eventServiceMock: jest.Mocked<EventService>;
  let eventRepositoryMock: jest.Mocked<EventRepository>;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    eventRepositoryMock = new EventRepository() as jest.Mocked<EventRepository>;
    eventServiceMock = new EventService(eventRepositoryMock) as jest.Mocked<EventService>;

    const eventController = new EventController(eventServiceMock);

    app.post('/events/initialize', eventController.initializeEvent);
    app.get('/events/status/:eventId', eventController.getEventStatus);
  });

  it('should initialize an event', async () => {
    // Mock event object including all necessary fields
    const event: Event = {
      id: '1',
      name: 'Test Event',
      totalTickets: 100,
      availableTickets: 100,
      bookings: [],       // Add missing properties
      waitingList: [],    // Add missing properties
    };

    eventServiceMock.initializeEvent.mockResolvedValue(event);

    const res = await request(app)
      .post('/events/initialize')
      .send({ name: 'Test Event', totalTickets: 100 });

    expect(res.status).toBe(201);
    expect(res.body).toEqual(event);
    expect(eventServiceMock.initializeEvent).toHaveBeenCalledWith('Test Event', 100);
  });

  it('should get event status', async () => {
    const event: Event = {
      id: '1',
      name: 'Test Event',
      totalTickets: 100,
      availableTickets: 100,
      bookings: [],       // Add missing properties
      waitingList: [],    // Add missing properties
    };

    eventServiceMock.getEventStatus.mockResolvedValue(event);

    const res = await request(app).get('/events/status/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(event);
    expect(eventServiceMock.getEventStatus).toHaveBeenCalledWith('1');
  });
});
