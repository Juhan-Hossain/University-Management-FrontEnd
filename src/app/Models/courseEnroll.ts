export class courseEnroll {
  constructor(
    public id: number,
    public studentRegNo: string,
    public courseCode: string,
    public departmentId: number,
    public date: Date,
    public isEnrolled: boolean,
    public grade: string
  ) {}
}
