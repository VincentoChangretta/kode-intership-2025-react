export const isBirthdayThisYear = (date: string): boolean => {
  const birthDate = new Date(date);
  const currentDate = new Date();

  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  return currentMonth > birthMonth || (currentMonth === birthMonth && currentDay >= birthDay);
};
