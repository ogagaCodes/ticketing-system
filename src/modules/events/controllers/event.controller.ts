import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { CreateEventDto } from '../dto/create-event.dto';
import { GetEventStatusDto } from '../dto/get-event-status.dto';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class EventController {
  constructor(private eventService: EventService) {}

  public initializeEvent = async (req: Request, res: Response) => {
    const createEventDto = plainToInstance(CreateEventDto, req.body);
    
    try {
      await validateOrReject(createEventDto);
      const event = await this.eventService.initializeEvent(createEventDto.name, createEventDto.totalTickets);
      res.status(201).json(event);
    } catch (errors) {
      res.status(400).json({ message: 'Validation failed', errors });
    }
  };

  public getEventStatus = async (req: Request, res: Response) => {
    const getEventStatusDto = plainToInstance(GetEventStatusDto, req.params);
    
    try {
      await validateOrReject(getEventStatusDto);
      const status = await this.eventService.getEventStatus(getEventStatusDto.eventId);
      res.status(200).json(status);
    } catch (errors) {
      res.status(400).json({ message: 'Validation failed', errors });
    }
  };
}
