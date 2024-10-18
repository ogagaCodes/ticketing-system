import { AppDataSource } from "../../../config/database";
import { Event } from '../entities/event.entity';

export class EventRepository {
  private eventRepo = AppDataSource.getRepository(Event);

  async createEvent(name: string, totalTickets: number) {
    const event = this.eventRepo.create({ name, totalTickets, availableTickets: totalTickets });
    return this.eventRepo.save(event);
  }

  async findEventById(eventId: string) {
    return this.eventRepo.findOne({
      where: { id: eventId },
      relations: ['bookings', 'waitingList'],  // Correctly fetching relations
    });
  }
}
