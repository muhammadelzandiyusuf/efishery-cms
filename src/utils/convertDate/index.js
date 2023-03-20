import moment from 'moment';

export const convertDate = (date) => {
  if (!date) return null;
  return moment(date).format('DD-MM-YYYY');
};
