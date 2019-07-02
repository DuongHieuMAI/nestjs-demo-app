import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const statusCode = (exception instanceof HttpException) ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = (exception instanceof HttpException) ? exception.message.message : 'Unknown error';

    response
      .status(statusCode)
      .json({
        status: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: errorMessage,
      });
  }
}
