import { IsUUID } from 'class-validator';

export class GetEventStatusDto {
  @IsUUID()
  eventId: string;
}
