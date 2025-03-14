import axios from 'axios';
import { AllDepartments } from 'shared/config/navDepartmentConfig/navDepartmentConfig';

export const FETCH_ERROR: string = 'fetch_error';

export const getUsers = async (departament: string = AllDepartments.All) => {
  try {
    const res = await axios.get(
      `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${departament}`,
    );
    if (res.status !== 200) {
      throw new Error(`Ошибка ${res.status}`);
    }
    return res.data.items;
  } catch (error) {
    console.error('Ошибка:', error.message);
    throw new Error();
  }
};
