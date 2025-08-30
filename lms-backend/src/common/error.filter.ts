import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { WebResponse } from 'src/model/web.model';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    let webResponse: WebResponse<null> = {
      success: false,
      status_code: 500,
      message: 'Internal server error',
    };

    if (exception instanceof HttpException) {
      const httpResponse = exception.getResponse();
      const httpStatus = exception.getStatus();

      const message =
        typeof httpResponse === 'string'
          ? httpResponse
          : Array.isArray(httpResponse['message'])
            ? httpResponse['message'].join(', ')
            : httpResponse['message'] || 'Error';

      webResponse = {
        success: false,
        message,
        status_code: httpStatus,
      };

      response.status(httpStatus).json(webResponse);
    } else if (exception instanceof ZodError) {
      webResponse = {
        success: false,
        message: 'Validation Error',
        status_code: 400,
        error:
          'Validation failed: ' +
          exception.issues.map((e) => e.message).join(', '),
      };

      response.status(400).json(webResponse);
    } else {
      response.status(500).json(webResponse);
    }
  }
}
