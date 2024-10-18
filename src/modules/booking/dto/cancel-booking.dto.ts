import { IsUUID, IsString } from 'class-validator';

export class CancelBookingDto {
  @IsUUID()
  eventId: string;

  @IsString()
  userId: string;
}
