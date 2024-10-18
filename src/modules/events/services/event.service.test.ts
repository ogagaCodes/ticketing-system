import { EventService } from './event.service';
import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event.entity';

jest.mock('../repositories/event.repository');

describe('EventService', () => {
  let eventService: EventService;
  let eventRepositoryMock: jest.Mocked<EventRepository>;

  beforeEach(() => {
    eventRepositoryMock = new EventRepository() as jest.Mocked<EventRepository>;
    eventService = new EventService(eventRepositoryMock);
  });

  it('should initialize an event', async () => {
    const event = { id: '1', name: 'Test Event', totalTickets: 100, availableTickets: 100 } as Event;
    eventRepositoryMock.createEvent.mockResolvedValue(event);

    const result = await eventService.initializeEvent('Test Event', 100);
    expect(eventRepositoryMock.createEvent).toHaveBeenCalledWith('Test Event', 100);
    expect(result).toEqual(event);
  });

  it('should get event status', async () => {
    const event = { id: '1', name: 'Test Event', totalTickets: 100, availableTickets: 100 } as Event;
    eventRepositoryMock.findEventById.mockResolvedValue(event);

    const result = await eventService.getEventStatus('1');
    expect(eventRepositoryMock.findEventById).toHaveBeenCalledWith('1');
    expect(result).toEqual(event);
  });
});
