import { FirstCharacterPipe } from './first-character.pipe';

describe('FirstCharacterPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstCharacterPipe();
    expect(pipe).toBeTruthy();
  });
});
