module.exports = {
  format_date: date => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`;
  }
};