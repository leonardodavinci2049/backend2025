export class ResultModel {
  constructor(
    public statusCode: number,
    public message: string,
    public id_record: number,
    public data: any,
    public qt_records?: number,
    public info1?: string,
    public info2?: string,
  ) {}
}
