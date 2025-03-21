import { UserSchema } from 'entities/Users';
import { sortByBirthday } from './sortByBirthday';

const users: UserSchema[] = [
  {
    id: '1',
    avatarUrl: 'url1',
    birthday: '1990-03-10',
    department: 'HR',
    firstName: 'Aram',
    lastName: 'Arseni',
    phone: '123456789',
    position: 'Менеджер',
    userTag: 'aa',
  },
  {
    id: '2',
    avatarUrl: 'url2',
    birthday: '1992-04-05',
    department: 'Инженерия',
    firstName: 'Alisa',
    lastName: 'Fedotova',
    phone: '987654321',
    position: 'dev',
    userTag: 'af',
  },
  {
    id: '3',
    avatarUrl: 'url3',
    birthday: '1995-05-15',
    department: 'Маркетинг',
    firstName: 'Ivan',
    lastName: 'Ivan',
    phone: '111222333',
    position: 'pr',
    userTag: 'bb',
  },
];

describe('сортировка по дате', () => {
  test('Функция должна сортировать пользователей по ближайшему дню рождения', () => {
    // здесь учитывай , что даты меняются независимо и тесты будут падать в будущем
    const sortedUsers = sortByBirthday(users);
    expect(sortedUsers[0].firstName).toEqual('Alisa');
    expect(sortedUsers[1].firstName).toEqual('Ivan');
    expect(sortedUsers[2].firstName).toEqual('Aram');
  });

  test('Функция не должна изменять оригинальный массив', () => {
    const usersCopy = [...users];
    sortByBirthday(users);
    expect(users).toEqual(usersCopy);
  });

  test('Если день рождения уже был в этом году, то сортировка должна учитывать следующий год', () => {
    const usersWithPastBirthday: UserSchema[] = [
      {
        id: '1',
        avatarUrl: 'url1',
        birthday: '2000-03-01',
        department: 'HR',
        firstName: 'Aram',
        lastName: 'Aram',
        phone: '123456789',
        position: 'Менеджер',
        userTag: 'aa',
      },
      {
        id: '2',
        avatarUrl: 'url2',
        birthday: '2000-02-28',
        department: 'Инженерия',
        firstName: 'Alisa',
        lastName: 'Fedotova',
        phone: '987654321',
        position: 'dev',
        userTag: 'af',
      },
    ];

    const sortedUsers = sortByBirthday(usersWithPastBirthday);

    expect(sortedUsers[0].firstName).toEqual('Alisa');
    expect(sortedUsers[1].firstName).toEqual('Aram');
  });
});
