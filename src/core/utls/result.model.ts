export class ResultModel {
  constructor(
    public statusCode: number,
    public message: string,
    public error: string,
    public data: any,
  ) {}
}
