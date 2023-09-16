import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { AttendanceService } from '@/services/attendances.service';
import { Attendance, CreateCheckBody } from '@/interfaces/attendances.interfaces';

export class AttendanceController {
  public service = Container.get(AttendanceService);

  public createCheckIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateCheckBody = req.body;
      const createData: Attendance = await this.service.createCheckIn(data);

      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
  public createCheckOut = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateCheckBody = req.body;
      const createData: Attendance = await this.service.createCheckOut(data);
      res.status(201).json({ data: createData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
