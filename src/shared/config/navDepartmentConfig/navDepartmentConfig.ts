export interface departmentArrTypes {
  name: string;
  link: string;
}

export enum AllDepartments {
  All = 'all',
  Android = 'android',
  IOS = 'ios',
  Design = 'design',
  Management = 'management',
  QA = 'qa',
  BackOffice = 'back_office',
  Frontend = 'frontend',
  HR = 'hr',
  PR = 'pr',
  Backend = 'backend',
  Support = 'support',
  Analytics = 'analytics',
}

export const departmentDetails: { [key in AllDepartments]: departmentArrTypes } = {
  [AllDepartments.All]: { name: 'Все', link: AllDepartments.All },
  [AllDepartments.Android]: { name: 'Android', link: AllDepartments.Android },
  [AllDepartments.IOS]: { name: 'iOS', link: AllDepartments.IOS },
  [AllDepartments.Design]: { name: 'Дизайн', link: AllDepartments.Design },
  [AllDepartments.Management]: { name: 'Менеджмент', link: AllDepartments.Management },
  [AllDepartments.QA]: { name: 'QA', link: AllDepartments.QA },
  [AllDepartments.BackOffice]: { name: 'Бэк-офис', link: AllDepartments.BackOffice },
  [AllDepartments.Frontend]: { name: 'Frontend', link: AllDepartments.Frontend },
  [AllDepartments.HR]: { name: 'HR', link: AllDepartments.HR },
  [AllDepartments.PR]: { name: 'PR', link: AllDepartments.PR },
  [AllDepartments.Backend]: { name: 'Backend', link: AllDepartments.Backend },
  [AllDepartments.Support]: { name: 'Техподдержка', link: AllDepartments.Support },
  [AllDepartments.Analytics]: { name: 'Аналитика', link: AllDepartments.Analytics },
};

export const departmentArr: departmentArrTypes[] = Object.values(departmentDetails);
