module.exports = {
  format_date: utcDate => {
    // const localTime = Date.parse(utcDate) - utcDate.getTimezoneOffset()*60*1000;
    const localTime = Date.parse(utcDate) - 28800000;
    // console.log(localTime);
    const date = new Date(localTime);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`;
  }
};