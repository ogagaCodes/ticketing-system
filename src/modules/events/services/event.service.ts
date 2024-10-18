import { EventRepository } from '../repositories/event.repository';

export class EventService {
  constructor(private eventRepository: EventRepository) {}

  async initializeEvent(name: string, totalTickets: number) {
    return this.eventRepository.createEvent(name, totalTickets);
  }

  async getEventStatus(eventId: string) {
    return this.eventRepository.findEventById(eventId);
  }
}
