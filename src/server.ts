import { App } from '@/app';
import { EmployeeRoute } from '@/routes/employees.route';
import { ValidateEnv } from '@utils/validateEnv';
import { AttendanceRoute } from './routes/attendances.route';

ValidateEnv();

const app = new App([new EmployeeRoute(), new AttendanceRoute()]);

app.listen();
