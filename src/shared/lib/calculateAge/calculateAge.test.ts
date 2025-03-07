import { calculateAge } from './calculateAge';

describe('Функция calculateAge', () => {
  it('должна вернуть возраст 0 лет, если дата рождения сегодня', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(calculateAge(today)).toBe('0 лет');
  });

  it('должна корректно вычислять возраст для человека, которому уже исполнилось 1 год', () => {
    const birthDate = '2024-03-07';
    expect(calculateAge(birthDate)).toBe('1 год');
  });

  it('должна корректно вычислять возраст для человека, которому исполнилось 2 года', () => {
    const birthDate = '2023-03-07';
    expect(calculateAge(birthDate)).toBe('2 года');
  });

  it('должна корректно вычислять возраст для человека, которому исполнилось 5 лет', () => {
    const birthDate = '2019-03-07';
    expect(calculateAge(birthDate)).toBe('6 лет');
  });

  it('должна корректно вычислять возраст для человека, которому исполнилось 21 год', () => {
    const birthDate = '2004-03-07';
    expect(calculateAge(birthDate)).toBe('21 год');
  });

  it('должна корректно вычислять возраст для человека, которому исполнилось 22 года', () => {
    const birthDate = '2003-03-07';
    expect(calculateAge(birthDate)).toBe('22 года');
  });

  it('должна корректно вычислять возраст для человека, которому исполнилось 25 лет', () => {
    const birthDate = '1998-03-07';
    expect(calculateAge(birthDate)).toBe('27 лет');
  });

  it('должна учесть, если день рождения еще не был в текущем году', () => {
    const birthDate = '2000-12-31';
    const expectedAge = new Date().getFullYear() - 2000 - 1;
    expect(calculateAge(birthDate)).toBe(`${expectedAge} года`);
  });
});
