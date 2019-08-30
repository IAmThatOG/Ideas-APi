import { Catch, ExceptionFilter, HttpException, ArgumentsHost, Logger } from "@nestjs/common";
import { Response, Request } from "express";
import { BaseResponseDto } from "../idea/models/base-response.dto";

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        const errorResponse = {
            httpStatus: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || exception.message || null
        }

        Logger.error(
            `${request.method} => ${request.url}`,
            JSON.stringify(errorResponse),
            HttpErrorFilter.name
        );

        const errResponse = new BaseResponseDto('99', 'an error occured', errorResponse);
        response.status(404).json(errResponse);
    }
}
