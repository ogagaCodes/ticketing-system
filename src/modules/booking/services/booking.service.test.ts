import { BookingService } from './booking.service';
import { BookingRepository } from '../repositories/booking.repository';
import { Event } from '../../events/entities/event.entity';
import { Booking } from '../entities/booking.entity';

jest.mock('../repositories/booking.repository');

describe('BookingService', () => {
  let bookingService: BookingService;
  let bookingRepositoryMock: jest.Mocked<BookingRepository>;

  beforeEach(() => {
    bookingRepositoryMock = new BookingRepository() as jest.Mocked<BookingRepository>;
    bookingService = new BookingService(bookingRepositoryMock);
  });

  it('should book a ticket', async () => {
    const event = { id: '1', availableTickets: 100 } as Event;
    const booking = { id: '1', userId: 'user1', event } as Booking;

    bookingRepositoryMock.bookTicket.mockResolvedValue(booking);

    const result = await bookingService.bookTicket('1', 'user1');
    expect(result).toEqual(booking);
    expect(bookingRepositoryMock.bookTicket).toHaveBeenCalledWith('1', 'user1');
  });

  it('should cancel a booking', async () => {
    const event = { id: '1', availableTickets: 100 } as Event;

    bookingRepositoryMock.cancelBooking.mockResolvedValue(event);

    const result = await bookingService.cancelBooking('1', 'user1');
    expect(result).toEqual(event);
    expect(bookingRepositoryMock.cancelBooking).toHaveBeenCalledWith('1', 'user1');
  });
});
