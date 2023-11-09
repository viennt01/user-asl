import dayjs from 'dayjs';

const DEFAULT_STRING_FORMAT = 'HH:mm DD/MM/YYYY';

export function formatDate(
  date: string | number,
  stringFormat = DEFAULT_STRING_FORMAT
) {
  return dayjs(date).format(stringFormat);
}
