let sum = (a,b) => a+b ;

test('sum test 1+2=3', () => {
    expect(sum(1, 2)).toBe(3);
});