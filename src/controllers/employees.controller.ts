import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Employee } from '@interfaces/employees.interface';
import { EmployeeService } from '@/services/employees.service';

export class EmployeeController {
  public employee = Container.get(EmployeeService);

  public getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const filtredDate = req.query.dateCreated?.toString();
      const findAllEmployeesData: Employee[] = await this.employee.findAllEmployee(filtredDate);
      res.status(200).json({ data: findAllEmployeesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const employeeData: Employee = req.body;
      const createEmployeeData: Employee = await this.employee.createEmployee(employeeData);

      res.status(201).json({ data: createEmployeeData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
