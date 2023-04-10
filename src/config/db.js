import mongoose from 'mongoose';
import { logError, logInfo } from '../helpers/logger.js';

const connectDB = async () => {
  try {

    const fetch_url = 'mongodb://localhost/mongoSample'
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    const conn = await mongoose.connect(fetch_url, options);

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    logInfo(`MongoDB Connected with ${conn.connection.host}`)
  } catch (err) {
    // console.error(`Error: ${err.message}`);
    logError("DB error : ", err)
    process.exit(1);
  }
};

export default connectDB;


// import { MongoClient } from 'mongodb';

// const connectDB = async () => {
//   const uri = process.env.MONGO_URI;
//   const client = new MongoClient(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     console.log('MongoDB Connected');

//     // Return the database instance
//     return client.db();
//   } catch (err) {
//     console.error(`Error: ${err.message}`);
//     process.exit(1);
//   }
// };

// export default connectDB;