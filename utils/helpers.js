module.exports = {
  format_date: utcDate => {
    const localTime = Date.parse(utcDate) - utcDate.getTimezoneOffset()*60*1000;
    console.log(localTime);
    // const pacTime = Date.parse(utcDate) - 28800000;
    const date = new Date(localTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`;
  }
};