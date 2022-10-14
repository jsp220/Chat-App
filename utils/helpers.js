module.exports = {
  format_date: date => {
    const utcDate = new Date(`${date} UTC`)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString('en-US')}`;
  }
};


// module.exports = {
//   format_date: date => {
//     return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//   }
// };