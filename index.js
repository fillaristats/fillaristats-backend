require('dotenv').config()
const fetchStations = require('./fetchStations')
const {sequelize, Station, LogEntry} = require('./models/index.js')()

function saveLogEntry (dbStation, bikesAvailable, spacesAvailable, t) {
  return LogEntry.create({
    bikesAvailable, spacesAvailable
  }, { transaction: t }).then((entry) => {
    console.log('Luotiin entry')
    entry.setStation(dbStation)
  }).catch((what) => {
    console.error('APUA')
    console.error(what)
  })
}

function saveToDb (body) {
  body.data.bikeRentalStations.forEach((respStation) => {
    const { stationId, name, lat, lon, bikesAvailable, spacesAvailable } = respStation
    console.log(respStation.name)
    setTimeout(() => {
      return sequelize.transaction((t) => {
        return Station.findOne({ where: { stationId } }, { transaction: t }).then((s) => {
          if (!s) {
            console.log('Ei löydy')
            return Station.create({
              stationId,
              name,
              lat,
              lon
            }, { transaction: t }).then((s) => {
              return saveLogEntry(s, bikesAvailable, spacesAvailable, t)
            })
          } else {
            return saveLogEntry(s, bikesAvailable, spacesAvailable, t)
          }
        }).catch((asd) => {
          console.log('moi')
        })
      })
    }, (Math.floor(Math.random() * 10000) + 1000))
  })
}

function fetch () {
  fetchStations((err, resp, body) => {
    if (err) {
      console.log('Error occurred, aborting fetch.')
      return
    }
    // console.log(body.data.bikeRentalStations)
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
