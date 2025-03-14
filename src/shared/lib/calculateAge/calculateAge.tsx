export const calculateAge = (birthdate: string): string => {
  const currentDate = new Date();
  const birthDate = new Date(birthdate);

  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  const currentDay = currentDate.getDate();
  const birthDay = birthDate.getDate();

  if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
    age--;
  }

  let ageString = `${age} `;
  if (age % 10 === 1 && age % 100 !== 11) {
    ageString += 'год';
  } else if (age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)) {
    ageString += 'года';
  } else {
    ageString += 'лет';
  }

  return ageString;
};
