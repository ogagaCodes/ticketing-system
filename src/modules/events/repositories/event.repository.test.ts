import { AppDataSource } from '../../../config/database';
import { EventRepository } from './event.repository';
import { Event } from '../entities/event.entity';
import { Repository } from 'typeorm';

jest.mock('../../../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('EventRepository', () => {
  let eventRepository: EventRepository;
  let eventRepoMock: jest.Mocked<Repository<Event>>;

  beforeEach(() => {
    eventRepoMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<Event>>;

    (AppDataSource.getRepository as jest.Mock).mockReturnValue(eventRepoMock);
    eventRepository = new EventRepository();
  });

  it('should create an event', async () => {
    const event = { id: '1', name: 'Test Event', totalTickets: 100, availableTickets: 100 } as Event;
    eventRepoMock.create.mockReturnValue(event);
    eventRepoMock.save.mockResolvedValue(event);

    const result = await eventRepository.createEvent('Test Event', 100);
    expect(eventRepoMock.create).toHaveBeenCalledWith({ name: 'Test Event', totalTickets: 100, availableTickets: 100 });
    expect(eventRepoMock.save).toHaveBeenCalledWith(event);
    expect(result).toEqual(event);
  });

  it('should find an event by ID', async () => {
    const event = { id: '1', name: 'Test Event', totalTickets: 100, availableTickets: 100 } as Event;
    eventRepoMock.findOne.mockResolvedValue(event);

    const result = await eventRepository.findEventById('1');
    expect(eventRepoMock.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['bookings', 'waitingList'] });
    expect(result).toEqual(event);
  });
});
