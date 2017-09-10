import moment from 'moment';

export const formatDate = ({ date, format = 'LLLL' }) => (
  moment(date).format(format)
);
