import { StrengthPipe } from "./strength.pipe";


describe('Strength Pipe', () => {
  it('Should display week if strength is 5', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(5)).toBe('5 (weak)');
  });

  it('Should display strong if strength is 10', () => {
    let pipe = new StrengthPipe();

    expect(pipe.transform(10)).toBe('10 (strong)');
  });
});
