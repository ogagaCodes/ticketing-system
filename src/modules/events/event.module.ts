import { Router } from 'express';
import { EventController } from './controllers/event.controller';
import { EventService } from './services/event.service';
import { EventRepository } from './repositories/event.repository';

export class EventModule {
  public router: Router;
  private eventController: EventController;
  private eventService: EventService;
  private eventRepository: EventRepository;

  constructor() {
    this.router = Router();
    this.eventRepository = new EventRepository();
    this.eventService = new EventService(this.eventRepository);
    this.eventController = new EventController(this.eventService);
    this.routes();
  }

  private routes(): void {
    this.router.post('/initialize', this.eventController.initializeEvent);
    this.router.get('/status/:eventId', this.eventController.getEventStatus);
  }
}
