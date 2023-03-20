import moment from 'moment';

export const convertDate = (date, format) => {
  if (!date) return null;
  return moment(date).format(format);
};
