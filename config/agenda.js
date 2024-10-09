const Agenda = require('agenda');
const config = require("./config");

const agenda = new Agenda({
  db: { address: config.MONGO_DATABASE_DEV }, // Replace with your MongoDB connection string
  collection: 'agendaJobs', // Specify the name of the collection where jobs will be stored
});



// Start Agenda
(async () => await agenda.start())();

// Add a catch for any errors that might occur during job processing
agenda.on('fail', (err, job) => {
  console.error(`Job failed with error: ${err.message}`);
});

module.exports = agenda;