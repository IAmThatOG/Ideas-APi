import { IdeaResponseDto } from './idea-response.dto';

describe('IdeaResponse.Dto', () => {
  it('should be defined', () => {
    expect(new IdeaResponseDto(
      "1",
      "first idea",
      "first idea description",
      new Date(2019, 08, 27, 13, 30, 3),
      new Date(2019, 08, 27, 13, 30, 3)
    )).toBeDefined();
  });
});
