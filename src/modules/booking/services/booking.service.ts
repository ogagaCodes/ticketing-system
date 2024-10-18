import { BookingRepository } from '../repositories/booking.repository';

export class BookingService {
  constructor(private bookingRepository: BookingRepository) {}

  async bookTicket(eventId: string, userId: string) {
    return this.bookingRepository.bookTicket(eventId, userId);
  }

  async cancelBooking(eventId: string, userId: string) {
    return this.bookingRepository.cancelBooking(eventId, userId);
  }
}
