export class studentResult {
  constructor(
    public id: number,
    public studentRegNo: string,
    public courseName: string,
    public departmentName: string,
    public name: string,
    public email: string,
    public isEnrolled: boolean,
    public gradeLetter: string,
    public result: boolean
  ) {}
}
