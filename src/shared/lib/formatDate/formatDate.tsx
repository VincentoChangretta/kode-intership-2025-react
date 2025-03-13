import { TFunction } from 'i18next';

export const formatDate = (dateString: string, t: TFunction): string => {
  if (!dateString.length) return '';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return t('Ошибка даты');
  }

  const months: string[] = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${t(month)} ${year}`;
};
