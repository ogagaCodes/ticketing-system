import { IsUUID, IsString } from 'class-validator';

export class BookTicketDto {
  @IsUUID()
  eventId: string;

  @IsString()
  userId: string;
}
