import Sequelize from 'sequelize';
import database from './database.js';

export default database.define('countries', {
  shortname: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
}, {
  timestamps: false,
  freezeTableName: true
});
