export class roomAllocation {
  constructor(
    public courseCode: string,
    public departmentId: number,
    public RoomId: number,
    public dayId: number,
    public startTime: Date,
    public EndTime: Date,
    public FromMeridiem: string,
    public ToMeridiem: string
  ) {}
}
