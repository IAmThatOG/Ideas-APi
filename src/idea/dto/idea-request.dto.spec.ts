import { IdeaRequestDto } from './idea-request.dto';

describe('IdeaRequestDto', () => {
  it('should be defined', () => {
    expect(
      new IdeaRequestDto('first Idea', 'first idea description'),
    ).toBeDefined();
  });
});
