import request from 'supertest';
import { App } from '@/app';
import { CreateEmployeeDto } from '@/dtos/employees.dto';
import { EmployeeRoute } from '@/routes/employees.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Employees', () => {
  describe('[GET] /employees', () => {
    it('response findAll employees', async () => {
      const employeesRoute = new EmployeeRoute();
      const employees = employeesRoute.controller.employee.model;

      employees.findMany = jest.fn().mockReturnValue([
        {
          id: 1,
          lastName: 'Mohammed',
          firstName: 'Mohammed',
          department: 'Info',
        },
        {
          id: 2,
          lastName: 'Mohammed',
          firstName: 'Mohammed',
          department: 'Info',
        },
        {
          id: 3,
          lastName: 'Mohammed',
          firstName: 'Mohammed',
          department: 'Info',
        },
      ]);

      const app = new App([employeesRoute]);
      return request(app.getServer()).get(`${employeesRoute.path}`).expect(200);
    });
  });

  describe('[POST] /employees', () => {
    it('response Create employee', async () => {
      const employeeData: CreateEmployeeDto = {
        lastName: 'Mohammed',
        firstName: 'Mohammed',
        department: 'Info',
      };

      const employeesRoute = new EmployeeRoute();
      const employees = employeesRoute.controller.employee.model;
      employees.create = jest.fn().mockReturnValue({
        id: 1,
        lastName: employeeData.lastName,
        firstName: employeeData.firstName,
        department: employeeData.department,
      });

      const app = new App([employeesRoute]);
      return request(app.getServer()).post(`${employeesRoute.path}`).send(employeeData).expect(201);
    });
  });
});
