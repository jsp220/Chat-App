module.exports = {
  format_date: utcDate => {
    const pacTime = Date.parse(utcDate) - 25200000;
    const date = new Date(pacTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`;
  }
};