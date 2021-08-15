describe('First test', () => {
  let sut; //System under test

  beforeEach(() => {
    sut = {};
  });

  it('Should be true if true', () => {
    // arrange
    sut.a = false;

    // act
    sut.a = true;

    // assert
    expect(sut.a).toBeTruthy();
  });
});
