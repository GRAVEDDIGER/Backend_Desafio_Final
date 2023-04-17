import { IResponse } from '../index'
export class ResponseObject implements IResponse {
  // eslint-disable-next-line n/handle-callback-err
  constructor (public error: any, public ok: boolean, public response: any) {}
}
