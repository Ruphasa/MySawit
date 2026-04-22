import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, EMPTY, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { VIEW_METADATA } from '../decorators/view.decorator';
import { Response } from 'express';

@Injectable()
export class SmartResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const template = this.reflector.get<string>(VIEW_METADATA, context.getHandler());

    const response: Response = context.switchToHttp().getResponse();
    const accept = request.headers['accept'] || '';
    // Only treat as JSON if it explicitly asks for it and NOT for HTML
    const isJson = accept.includes('application/json') && !accept.includes('text/html');

    return next.handle().pipe(
      switchMap((data) => {
        // 1. Handle programmatic redirects (Highest Priority)
        // If it's a browser request (has text/html), always redirect if 'redirect' is present
        if (data?.redirect && !isJson) {
          response.redirect(data.redirect);
          return EMPTY;
        }

        // 2. Handle JSON/API requests
        if (isJson || !template) {
          return of(data);
        }

        // 3. Handle Template Rendering
        return new Observable((subscriber) => {
          response.render(
            template,
            { 
              layout: 'layouts/main', // default layout
              ...data,                // allow data to override layout (e.g. layout: false)
              user: request.user
            },
            (err, html) => {
              if (err) {
                console.error('CRITICAL RENDER ERROR:', err);
                subscriber.error(err);
              } else {
                response.send(html);
                subscriber.complete();
              }
            },
          );
        });
      }),
    );
  }
}
