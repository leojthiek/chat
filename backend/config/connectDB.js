const mongoose = require('mongoose');

const DBconnection = async () => {
  try {
    const db = await mongoose.connect('mongodb://localhost:27017/DealDray', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB database:', db.connections[0].name);
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

module.exports = {DBconnection}


