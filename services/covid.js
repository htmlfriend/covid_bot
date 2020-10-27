require('dotenv').config();
const axios = require('axios');

const { COVID_KEY } = process.env;
let service = {};
service.getByCountry = (country) => {
  return axios({
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': `${COVID_KEY}`,
      useQueryString: true,
    },
    params: {
      country: country,
    },
  });
};

module.exports = service;
