import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { CreateEmployeeDto } from '@/dtos/employees.dto';
import { Employee } from '@interfaces/employees.interface';

@Service()
export class EmployeeService {
  public model = new PrismaClient().employee;

  public async findAllEmployee(dateCreated?: string): Promise<Employee[]> {
    if (dateCreated) {
      // PRISMA DOSENT SUPPORT NATIVE DATE THAT'S WHY I USED THIS TRICK
      const date = new Date(dateCreated);
      const nextDayDate = new Date(date.getTime() + 1000 * 60 * 60 * 24);
      console.log(date.toISOString(), nextDayDate.toISOString());
      const data = await this.model.findMany({ where: { dateCreated: { gte: date, lt: nextDayDate } } });
      return data;
    }
    const data = await this.model.findMany();
    return data;
  }

  public async createEmployee(employeeData: CreateEmployeeDto): Promise<Employee> {
    return await this.model.create({ data: employeeData });
  }
}
