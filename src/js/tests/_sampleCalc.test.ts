import { sampleCalc } from '../modules/_sampleCalc';

test('1 + 2 = 3', () => {
  expect(sampleCalc(1, 2)).toBe(3);
});