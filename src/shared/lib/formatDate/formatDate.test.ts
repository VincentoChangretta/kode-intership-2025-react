import i18n from 'shared/config/i18n/i18n';
import { formatDate } from './formatDate';

const t = i18n.t;

const testCases = [
  { date: '1973-01-24', expected: '24 января 1973' },
  { date: '1996-06-05', expected: '5 июня 1996' },
  { date: '2023-04-09', expected: '9 апреля 2023' },
  { date: '2020-12-31', expected: '31 декабря 2020' },
  { date: '2025-03-07', expected: '7 марта 2025' },
  { date: '2022-05-15', expected: '15 мая 2022' },
  { date: '2020-07-01', expected: '1 июля 2020' },
  { date: '2023-11-01', expected: '1 ноября 2023' },
];

describe('formatDate', () => {
  testCases.forEach(({ date, expected }) => {
    test('корректные даты', () => {
      const result = formatDate(date, t);
      expect(result).toBe(expected);
    });
  });

  test('пустая строка', () => {
    const result = formatDate('', t);
    expect(result).toBe('');
  });
  test('пустая строка', () => {
    const result = formatDate('', t);
    expect(result).not.toBe('Ошибка даты');
  });
  test('пустая строка', () => {
    const result = formatDate('', t);
    expect(result).not.toBe(NaN);
  });

  test('неправильное значение', () => {
    const result = formatDate('sad-ead-gh', t);
    expect(result).toBe('Ошибка даты');
  });

  test('неправильное значение', () => {
    const result = formatDate('sad-ead-gh', t);
    expect(result).not.toBe('');
  });
  test('неправильное значение', () => {
    const result = formatDate('sad-ead-gh', t);
    expect(result).not.toBe(NaN);
  });

  test('неправильный формат даты 2023-13-40 ', () => {
    const result = formatDate('2023-13-40', t);
    expect(result).not.toBe('');
  });
  test('неправильный формат даты 2023-13-40 ', () => {
    const result = formatDate('2023-13-40', t);
    expect(result).not.toBe(NaN);
  });
});
