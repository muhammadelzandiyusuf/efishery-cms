export const formatCurrency = (val, decimal, delimiter) => {
  let number = val;
  const decimalDelimiter = delimiter === '.' ? ',' : '.';

  if (!number) return '0';
  if (typeof number === 'string') {
    number = parseFloat(number);
    if (Number.isNaN(number)) return '0';
  }

  if (decimal !== null && decimal !== undefined && typeof decimal === 'number')
    number = number.toFixed(decimal);

  number = number.toString().replace('.', decimalDelimiter);
  const numberSections = number.toString().split(decimalDelimiter);
  numberSections[0] = numberSections[0]
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${delimiter ?? ','}`);

  return numberSections.join(decimalDelimiter);
};
