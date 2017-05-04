const request = require('request');

function fetchStations(cb) {
  const options = {
    url: 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql',
    json: {
      "query": `{
  bikeRentalStations {
    stationId
    name
    bikesAvailable
    spacesAvailable
    lat
    lon
  }
}`,
    },
    method: 'POST',
  };
  request(options, cb);
}

module.exports = fetchStations;
