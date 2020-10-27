const countryEmoji = require('country-emoji');
module.exports = (data) => {
  return `
Country: ${data.country} ${countryEmoji.flag(data.country) || ''}
Population: ${data.population}
New: *${data.cases.new}*
Active: ${data.cases.active}
Recovered: *${data.cases.recovered}*
Deaths: ${data.deaths.total}
=================
Total: ${data.cases.total}`;
};
