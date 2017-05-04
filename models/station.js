const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('station', {
    stationId: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    lat: Sequelize.DECIMAL(9, 6),
    lon: Sequelize.DECIMAL(9, 6)
  })
}
