import { AppDataSource } from '../../../config/database';
import { BookingRepository } from './booking.repository';
import { Booking } from '../entities/booking.entity';
import { Event } from '../../events/entities/event.entity';
import { Repository } from 'typeorm';

jest.mock('../../../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn(),
  },
}));

describe('BookingRepository', () => {
  let bookingRepository: BookingRepository;
  let bookingRepoMock: jest.Mocked<Repository<Booking>>;
  let eventRepoMock: jest.Mocked<Repository<Event>>;

  beforeEach(() => {
    bookingRepoMock = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<Repository<Booking>>;

    eventRepoMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Event>>;

    (AppDataSource.getRepository as jest.Mock)
      .mockReturnValueOnce(bookingRepoMock)
      .mockReturnValueOnce(eventRepoMock);

    bookingRepository = new BookingRepository();
  });

  it('should book a ticket if available', async () => {
    const event = { id: '1', availableTickets: 5, bookings: [], waitingList: [] } as Event;
    const booking = { id: '1', userId: 'user1', event } as Booking;

    eventRepoMock.findOne.mockResolvedValue(event);
    bookingRepoMock.create.mockReturnValue(booking);
    bookingRepoMock.save.mockResolvedValue(booking);
    eventRepoMock.save.mockResolvedValue(event);

    const result = await bookingRepository.bookTicket('1', 'user1');

    expect(result).toEqual(booking);
    expect(eventRepoMock.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['bookings', 'waitingList'],
    });
    expect(bookingRepoMock.create).toHaveBeenCalledWith({ userId: 'user1', event });
    expect(eventRepoMock.save).toHaveBeenCalledWith(event);
  });

  it('should add user to the waiting list if no tickets are available', async () => {
    const event = { id: '1', availableTickets: 0, bookings: [], waitingList: [] } as Event;
    const waitingList = { userId: 'user1', event };

    eventRepoMock.findOne.mockResolvedValue(event);

    const result = await bookingRepository.bookTicket('1', 'user1');

    expect(result).toEqual(waitingList);
    expect(eventRepoMock.findOne).toHaveBeenCalledWith({
      where: { id: '1' },
      relations: ['bookings', 'waitingList'],
    });
    expect(eventRepoMock.save).not.toHaveBeenCalled();
  });
});
