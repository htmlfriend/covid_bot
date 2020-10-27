const axios = require('axios');
let service = {};
service.getByCountry = (country) => {
  return axios({
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': 'aa6e74eb8fmsh44f82a24ce51c95p19952bjsn639505e65ab7',
      useQueryString: true,
    },
    params: {
      country: country,
    },
  });
};

module.exports = service;
