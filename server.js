const express = require('express')
const app = express()
const cors = require('cors')

const {Station} = require('./models/index.js')()

app.use(cors())

app.get('/api/stations', (req, res) => {
  Station.findAll({
    attributes: ['stationId', 'name', 'lat', 'lon']
  }).then((stations) => {
    res.json(stations)
  })
})

app.listen(3000, () => {
  console.log('Express listening')
})
