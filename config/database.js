const constants = require('./constants');
const winston = require('winston');
const mongoose = require('mongoose');

const connectionString = constants.DB_HOST;

const transport = new winston.transports.File({ filename: 'logfile.log' });
const logger = winston.createLogger({
  transports: [transport],
});

class Database {
  constructor() {
    this.connection = null;
    this.initializeEventHandlers();
  }
  initializeEventHandlers() {
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to ' + connectionString);
    });
    mongoose.connection.on('error', (err) => {
      logger.info('Error connecting to MongoDB: ' + err);
    });

  }

  async open() {
    try {
      await mongoose.connect(connectionString, {});
      this.connection = mongoose.connection;
      mongoose.Promise = global.Promise;

    } catch (err) {
      console.error('error', err);
    }
  }

  // disconnect from database
  close() {
    this.connection.close().then(() => {
      logger.info('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  }
}

module.exports = new Database();
