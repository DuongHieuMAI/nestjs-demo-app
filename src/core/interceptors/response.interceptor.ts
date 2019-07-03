import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { response } from 'express';

export interface Response<T> {
  status: true;
  data: T;
  // message: [];
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // const returnData = {
    //   status: true,
    //   result: map(data => ({data})),
    //   message: [],
    // }
    // @ts-ignore
    return next.handle().pipe(map(data => ({data, status: true})));
    // return next.handle().pipe(returnData);
  }
}
