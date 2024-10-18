// import request from 'supertest';
// import express from 'express';
// import { BookingController } from './booking.controller';
// import { BookingService } from '../services/booking.service';
// import { Event } from '../../events/entities/event.entity'; // Import the Event entity

// jest.mock('../services/booking.service');

// describe('BookingController', () => {
//   let app: express.Application;
//   let bookingServiceMock: jest.Mocked<BookingService>;

//   beforeEach(() => {
//     app = express();
//     app.use(express.json());

//     bookingServiceMock = new BookingService() as jest.Mocked<BookingService>;
//     const bookingController = new BookingController(bookingServiceMock);

//     app.post('/bookings/book', bookingController.bookTicket);
//     app.post('/bookings/cancel', bookingController.cancelBooking);
//   });

//   it('should book a ticket', async () => {
//     const booking = { id: '1', userId: 'user1', eventId: '1' };

//     bookingServiceMock.bookTicket.mockResolvedValue(booking);

//     const res = await request(app)
//       .post('/bookings/book')
//       .send({ eventId: '1', userId: 'user1' });

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(booking);
//     expect(bookingServiceMock.bookTicket).toHaveBeenCalledWith('1', 'user1');
//   });

//   it('should cancel a booking', async () => {
//     // Mock a complete Event object with all required properties
//     const event: Event = {
//       id: '1',
//       name: 'Test Event',              
//       totalTickets: 100,              
//       availableTickets: 100,            
//       bookings: [],                     
//       waitingList: [],                  
//     };

//     bookingServiceMock.cancelBooking.mockResolvedValue(event);

//     const res = await request(app)
//       .post('/bookings/cancel')
//       .send({ eventId: '1', userId: 'user1' });

//     expect(res.status).toBe(200);
//     expect(res.body).toEqual(event);
//     expect(bookingServiceMock.cancelBooking).toHaveBeenCalledWith('1', 'user1');
//   });
// });
