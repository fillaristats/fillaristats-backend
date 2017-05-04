const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('logentry', {
    bikesAvailable: Sequelize.INTEGER,
    spacesAvailable: Sequelize.INTEGER
  })
}
