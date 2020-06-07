module.exports = value => {
  return (value / (10 ** 12)).toFixed(12).replace(/\.?0+$/, '');
};
