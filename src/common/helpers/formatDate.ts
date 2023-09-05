import dayjs from 'dayjs';

export const formatDate = (date: string, format = 'DD.MM.YYYY') => dayjs(date).format(format);
