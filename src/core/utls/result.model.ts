export class ResultModel {
  constructor(
    public statusCode: number,
    public message: string,
    public id_record: number,
    public data: any,
  ) {}
}
