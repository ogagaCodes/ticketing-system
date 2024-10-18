import { Router } from 'express';
import { EventModule } from '../modules/events/event.module';
import { BookingModule } from '../modules/booking/booking.module';
// import { AuthModule } from '../modules/auth/auth.module';

const router = Router();

const eventModule = new EventModule();
const bookingModule = new BookingModule();
// const authModule = new AuthModule();

router.use('/events', eventModule.router);
router.use('/bookings', bookingModule.router);
// router.use('/auth', authModule.router);

export default router;
