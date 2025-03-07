import { formatDate } from './formatDate';

describe('formatDate', () => {
  test('date "1973-01-24" as "24 января 1973"', () => {
    const result = formatDate('1973-01-24');
    expect(result).toBe('24 января 1973');
  });

  test('date "1996-06-05" as "5 июня 1996"', () => {
    const result = formatDate('1996-06-05');
    expect(result).toBe('5 июня 1996');
  });

  test('date "2023-04-09" as "9 апреля 2023"', () => {
    const result = formatDate('2023-04-09');
    expect(result).toBe('9 апреля 2023');
  });

  test('date "2020-12-31" as "31 декабря 2020"', () => {
    const result = formatDate('2020-12-31');
    expect(result).toBe('31 декабря 2020');
  });

  test('date "2020-01-01" as "1 января 2020"', () => {
    const result = formatDate('2020-01-01');
    expect(result).toBe('1 января 2020');
  });

  test('the date "2000-12-31" as "31 января 2000"', () => {
    const result = formatDate('2000-12-31');
    expect(result).not.toBe('31 января 2000');
  });
  test('the date "2025-03-07" as "7 января 2025"', () => {
    const result = formatDate('2025-03-07');
    expect(result).not.toBe('7 января 2025');
  });

  test('date "2022-05-15" as "15 мая 2022"', () => {
    const result = formatDate('2022-05-15');
    expect(result).toBe('15 мая 2022');
  });

  test('the date "2020-07-01" as "1 июня 2020"', () => {
    const result = formatDate('2020-07-01');
    expect(result).not.toBe('1 июня 2020');
  });
  test('date "2023-11-01" as "1 ноября 2023"', () => {
    const result = formatDate('2023-11-01');
    expect(result).toBe('1 ноября 2023');
  });
});
