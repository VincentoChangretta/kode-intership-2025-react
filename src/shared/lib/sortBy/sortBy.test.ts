import { sortUsersBy } from './sortBy';
import { UserSchema } from 'entities/Users';
import { sortByAlphabet } from '../sortByAlphabet/sortByAlphabet';
import { sortByBirthday } from '../sorthByBirthday/sortByBirthday';
import { SortTypes } from 'entities/Users/model/slices/usersSlice';

jest.mock('../sortByAlphabet/sortByAlphabet');
jest.mock('../sorthByBirthday/sortByBirthday');

describe('Тесты для функции sortUsersBy', () => {
  const mockUserData: UserSchema[] = [
    {
      id: '1',
      avatarUrl: 'url1',
      birthday: '1990-01-01',
      department: 'HR',
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      position: 'Manager',
      userTag: 'JDoe',
    },
    {
      id: '2',
      avatarUrl: 'url2',
      birthday: '1985-05-10',
      department: 'HR',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '0987654321',
      position: 'Developer',
      userTag: 'JSmith',
    },
    {
      id: '3',
      avatarUrl: 'url3',
      birthday: '1995-03-15',
      department: 'IT',
      firstName: 'Alice',
      lastName: 'Johnson',
      phone: '1231231234',
      position: 'Developer',
      userTag: 'AJohnson',
    },
  ];

  test('сортировать пользователей по алфавиту, если выбран SortTypes.alphabetically', () => {
    (sortByAlphabet as jest.Mock).mockReturnValue([
      mockUserData[1],
      mockUserData[0],
      mockUserData[2],
    ]);

    const sortedUsers = sortUsersBy(SortTypes.alphabetically, [], mockUserData);
    expect(sortedUsers).toEqual([mockUserData[1], mockUserData[0], mockUserData[2]]);
    expect(sortByAlphabet).toHaveBeenCalledWith(mockUserData);
  });

  test('сортировать пользователей по дате рождения, если выбран SortTypes.byDate', () => {
    (sortByBirthday as jest.Mock).mockReturnValue([
      mockUserData[1],
      mockUserData[2],
      mockUserData[0],
    ]);
    const sortedUsers = sortUsersBy(SortTypes.byDate, [], mockUserData);
    expect(sortedUsers).toEqual([mockUserData[1], mockUserData[2], mockUserData[0]]);
    expect(sortByBirthday).toHaveBeenCalledWith(mockUserData);
  });

  test('исходный массив пользователей, если не передан правильный тип сортировки', () => {
    const sortedUsers = sortUsersBy('unknownSortType' as SortTypes, [], mockUserData);
    expect(sortedUsers).toEqual(mockUserData);
  });

  test('исходный массив пользователей, если передан пустой массив пользователей', () => {
    const sortedUsers = sortUsersBy(SortTypes.alphabetically, [], []);
    expect(sortedUsers).toEqual([]);
  });
});
