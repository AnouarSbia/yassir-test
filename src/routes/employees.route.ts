import { Router } from 'express';
import { EmployeeController } from '@/controllers/employees.controller';
import { CreateEmployeeDto } from '@/dtos/employees.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class EmployeeRoute implements Routes {
  public path = '/employees';
  public router = Router();
  public controller = new EmployeeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.controller.getEmployees);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateEmployeeDto), this.controller.createEmployee);
  }
}
