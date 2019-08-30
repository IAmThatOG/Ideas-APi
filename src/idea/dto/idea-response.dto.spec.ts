import { IdeaResponseDto } from './idea-response.dto';

describe('IdeaResponse.Dto', () => {
  it('should be defined', () => {
    expect(new IdeaResponseDto(
      "1",
      "first idea",
      "first idea description",
      new Date(),
      new Date()
    )).toBeDefined();
  });
});
