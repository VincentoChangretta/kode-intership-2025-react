import { isBirthdayThisYear } from './isBirthdayThisYear';

describe('isBirthdayThisYear', () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  test('должен вернуть true, если день рождения уже был в этом году', () => {
    const pastDate = `${currentYear}-02-15`;
    const result = isBirthdayThisYear(pastDate);
    expect(result).toBe(pastDate.slice(5, 10) < `${currentYear}-${currentMonth + 1}-${currentDay}`);
  });

  test('должен вернуть false, если день рождения ещё не был в этом году', () => {
    const futureDate = `${currentYear}-12-25`;
    const result = isBirthdayThisYear(futureDate);
    expect(result).toBe(
      futureDate.slice(5, 10) > `${currentYear}-${currentMonth + 1}-${currentDay}`,
    );
  });

  test('должен вернуть true, если день рождения сегодня', () => {
    const todayDate = `${currentYear}-${currentMonth + 1}-${currentDay}`;
    const result = isBirthdayThisYear(todayDate);
    expect(result).toBe(true);
  });

  test('должен вернуть false, если день рождения в следующем месяце', () => {
    const futureDate = `${currentYear}-${currentMonth + 2}-25`;
    const result = isBirthdayThisYear(futureDate);
    expect(result).toBe(false);
  });
});
