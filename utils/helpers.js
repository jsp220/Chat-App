module.exports = {
  format_date: date => {
    const utcDate = new Date(`${date} UTC`)
    return `${utcDate.toLocaleDateString()} ${utcDate.toLocaleTimeString('en-US')}`;
  }
};