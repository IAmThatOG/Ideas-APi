import { BaseResponseDto } from './base-response.dto';

describe('BaseResponseDto', () => {
  it('should be defined', () => {
    expect(new BaseResponseDto('00', 'success', {})).toBeDefined();
  });
});
