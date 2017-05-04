require('dotenv').config()
const fetchStations = require('./fetchStations')
const {sequelize, Station, LogEntry} = require('./models/index.js')()

function saveToDb (body) {
  body.data.bikeRentalStations.forEach((s) => {
    const { stationId, name, lat, lon, bikesAvailable, spacesAvailable } = s
    Station.findOrCreate({
      where: {
        stationId, name, lat, lon
      }
    }).spread((station, created) => {
      LogEntry.create({
        bikesAvailable, spacesAvailable
      }).then((entry) => {
        entry.setStation(station)
      })
    })
  })
}

function fetch () {
  fetchStations((err, resp, body) => {
    if (err) {
      console.log('Error occurred, aborting fetch.')
      return
    }
    console.log(body.data.bikeRentalStations)
    saveToDb(body)
  })
}

sequelize.sync({ force: true }).then(() => {
  fetch()
  require('./server.js')
  setInterval(() => {
    fetch()
  }, 60 * 1000)
})
