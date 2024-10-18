import { AppDataSource } from '../../../config/database';
import { Booking } from '../entities/booking.entity';
import { Event } from '../../events/entities/event.entity';
import { WaitingList } from '../entities/waitingList.entity';

export class BookingRepository {
  private bookingRepo = AppDataSource.getRepository(Booking);
  private eventRepo = AppDataSource.getRepository(Event);
  private waitingListRepo = AppDataSource.getRepository(WaitingList);

  // Method to book a ticket
  async bookTicket(eventId: string, userId: string) {
    // Fetch the event with related bookings and waiting list
    const event = await this.eventRepo.findOne({
      where: { id: eventId },
      relations: ['bookings', 'waitingList'],
    });

    if (!event) throw new Error('Event not found');

    // Check if tickets are available
    if (event.availableTickets > 0) {
      event.availableTickets -= 1; // Decrement the available tickets
      const booking = this.bookingRepo.create({ userId, event });
      await this.bookingRepo.save(booking); // Save the booking
      await this.eventRepo.save(event);     // Save the updated event (with decremented tickets)
      return booking;                       // Return the booking details
    } else {
      // If tickets are sold out, add user to waiting list
      const waitingList = this.waitingListRepo.create({ userId, event });
      await this.waitingListRepo.save(waitingList);  // Save to waiting list
      return waitingList;                            // Return waiting list details
    }
  }

  // Method to cancel a booking
  async cancelBooking(eventId: string, userId: string) {
    // Fetch the event with related bookings and waiting list
    const event = await this.eventRepo.findOne({
      where: { id: eventId },
      relations: ['bookings', 'waitingList'],
    });

    if (!event) throw new Error('Event not found');

    // Find the booking to be canceled
    const booking = await this.bookingRepo.findOne({ where: { userId, event } });
    if (!booking) throw new Error('Booking not found');

    // Remove the booking
    await this.bookingRepo.remove(booking);
    event.availableTickets += 1; // Increment available tickets

    // If there's a waiting list, assign the ticket to the first user in the waiting list
    if (event.waitingList.length > 0) {
      const nextInLine = event.waitingList.shift(); // Get the next user from the waiting list
      const newBooking = this.bookingRepo.create({ userId: nextInLine!.userId, event }); // Create a new booking for them
      await this.bookingRepo.save(newBooking);  // Save the new booking
    }

    // Save the updated event (with updated tickets and waiting list)
    await this.eventRepo.save(event);
    return event; // Return the updated event
  }
}
