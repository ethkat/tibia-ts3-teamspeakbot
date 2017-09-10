const isNumeric = num => !isNaN(num);

export const normalizeNumber = value => (
  isNumeric(value) ? +value : ''
);
