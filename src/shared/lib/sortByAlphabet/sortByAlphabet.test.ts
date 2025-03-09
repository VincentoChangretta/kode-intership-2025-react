import { UserSchema } from 'entities/Users';
import { sortByAlphabet } from './sortByAlphabet';

test('Функция должна сортировать пользователей по firstName в алфавитном порядке', () => {
  const users: UserSchema[] = [
    {
      id: '1',
      avatarUrl: '1',
      birthday: '2000-01-01',
      department: 'HR',
      firstName: 'Aram',
      lastName: 'Aram',
      phone: '123456789',
      position: 'Менеджер',
      userTag: 'cb',
    },
    {
      id: '2',
      avatarUrl: '2',
      birthday: '1995-05-05',
      department: 'Management',
      firstName: 'Alisa',
      lastName: 'Fedotova',
      phone: '987654321',
      position: 'dev',
      userTag: 'aw',
    },
    {
      id: '3',
      avatarUrl: '3',
      birthday: '1985-09-09',
      department: 'Маркетинг',
      firstName: 'Ivan',
      lastName: 'Ivan',
      phone: '111222333',
      position: 'developer',
      userTag: 'bb',
    },
  ];

  const sortedUsers = sortByAlphabet(users);

  expect(sortedUsers[0].firstName).toBe('Alisa');
  expect(sortedUsers[1].firstName).toBe('Aram');
  expect(sortedUsers[2].firstName).toBe('Ivan');
});

test('Функция не должна изменять оригинальный массив', () => {
  const users: UserSchema[] = [
    {
      id: '1',
      avatarUrl: 'url',
      birthday: '2000-01-01',
      department: 'HR',
      firstName: 'Aram',
      lastName: 'Aram',
      phone: '123456789',
      position: 'Менеджер',
      userTag: 'aa',
    },
    {
      id: '2',
      avatarUrl: 'url',
      birthday: '2000-01-01',
      department: 'HR',
      firstName: 'Alisa',
      lastName: 'Alisa',
      phone: '123456789',
      position: 'developer',
      userTag: 'af',
    },
  ];

  const usersCopy = [...users];
  sortByAlphabet(users);

  expect(users).toEqual(usersCopy);
});
