import { Request, Response } from 'express';
import { BookingService } from '../services/booking.service';
import { BookTicketDto } from '../dto/book-ticket.dto';
import { CancelBookingDto } from '../dto/cancel-booking.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class BookingController {
  constructor(private bookingService: BookingService) {}
  public bookTicket = async (req: Request, res: Response) => {
    const bookTicketDto = plainToInstance(BookTicketDto, req.body);
    
    try {
      await validateOrReject(bookTicketDto);
      const result = await this.bookingService.bookTicket(bookTicketDto.eventId, bookTicketDto.userId);
      res.status(200).json(result);
    } catch (errors) {
      res.status(400).json({ message: 'Validation failed', errors });
    }
  };
  public cancelBooking = async (req: Request, res: Response) => {
    const cancelBookingDto = plainToInstance(CancelBookingDto, req.body);
    
    try {
      await validateOrReject(cancelBookingDto);
      const result = await this.bookingService.cancelBooking(cancelBookingDto.eventId, cancelBookingDto.userId);
      res.status(200).json(result);
    } catch (errors) {
      res.status(400).json({ message: 'Validation failed', errors });
    }
  };
}
