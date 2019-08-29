
/**
 *API response wrapper
 *
 * @export
 * @class BaseResponseDto
 */
export class BaseResponseDto {
    constructor(public responseCode: string, public responseMsg: string, public body: any) { }
}
