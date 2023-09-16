import { Employee, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { Attendance, CreateCheckBody } from '@/interfaces/attendances.interfaces';
import { HttpException } from '@/exceptions/httpException';

@Service()
export class AttendanceService {
  public model = new PrismaClient().attedance;
  public employeeModel = new PrismaClient().employee;

  public async createCheckIn(attedanceData: CreateCheckBody): Promise<Attendance> {
    const findEmployee: Employee = await this.employeeModel.findUnique({ where: { id: attedanceData.employeeId } });
    if (!findEmployee) throw new HttpException(409, "Employee doesn't exist");
    return await this.model.create({ data: { employeeId: attedanceData.employeeId, check_in_comment: attedanceData.comment } });
  }
  public async createCheckOut(attedanceData: CreateCheckBody): Promise<Attendance> {
    const findEmployee: Employee = await this.employeeModel.findUnique({ where: { id: attedanceData.employeeId } });
    if (!findEmployee) throw new HttpException(409, "Employee doesn't exist");
    const findCheckIn: Attendance = await this.model.findFirst({ where: { check_out_date: null } });
    if (!findCheckIn) throw new HttpException(409, "check_in doesn't exist");
    const now = new Date();
    const duration = Math.floor((now.getTime() - findCheckIn.check_in_date.getTime()) / 1000); // Convert to secs and floor result

    return await this.model.update({
      data: { check_out_comment: attedanceData.comment, check_out_date: now, attedance_duration: duration },
      where: { id: findCheckIn.id },
    });
  }
}
