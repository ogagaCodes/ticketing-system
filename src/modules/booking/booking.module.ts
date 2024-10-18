import { Router } from 'express';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { BookingRepository } from './repositories/booking.repository';

export class BookingModule {
  public router: Router;
  private bookingController: BookingController;
  private bookingService: BookingService;
  private bookingRepository: BookingRepository;

  constructor() {
    this.router = Router();
    this.bookingRepository = new BookingRepository();
    this.bookingService = new BookingService(this.bookingRepository);
    this.bookingController = new BookingController(this.bookingService);
    this.routes();
  }

  private routes(): void {
    this.router.post('/book', this.bookingController.bookTicket);
    this.router.post('/cancel', this.bookingController.cancelBooking);
  }
}
