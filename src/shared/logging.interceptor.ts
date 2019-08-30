import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { tap } from 'rxjs/operators';

export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const method = req.method;
    const url = req.url;
    const now = Date.now();

    return next
      .handle()
      .pipe(
        tap(() =>
          Logger.log(
            `${method}, ${url}, ${Date.now() - now}ms`,
            context.getClass().name,
          ),
        ),
      );
  }
}
