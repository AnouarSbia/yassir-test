export interface Attendance {
  id?: number;
  employeeId: number;
  check_in_date: Date;
  check_in_comment: string;
  check_out_date?: Date;
  check_out_comment?: string;
  attedance_duration?: number;
}

export interface CreateCheckBody {
  employeeId: number;
  comment: string;
}
