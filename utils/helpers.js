module.exports = {
  format_date: utcDate => {
    const date = new Date(utcDate);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`;
  }
};