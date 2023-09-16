import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AttendanceController } from '@/controllers/attendances.controller';
import { CreateCheckDto } from '@/dtos/attendances.dto';

export class AttendanceRoute implements Routes {
  public router = Router();
  public controller = new AttendanceController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/check-in`, ValidationMiddleware(CreateCheckDto), this.controller.createCheckIn);
    this.router.post(`/check-out`, ValidationMiddleware(CreateCheckDto), this.controller.createCheckOut);
  }
}
