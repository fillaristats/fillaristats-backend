require('dotenv').config()
const Sequelize = require('sequelize')

module.exports = () => {
  const sequelize = new Sequelize(process.env.FILLARISTATS_DATABASE)

  const Station = require('./station.js')(sequelize)
  const LogEntry = require('./logentry.js')(sequelize)

  Station.hasMany(LogEntry)
  LogEntry.belongsTo(Station)

  return {sequelize, Station, LogEntry}
}
