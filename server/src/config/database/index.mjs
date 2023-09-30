import dotenv from 'dotenv';
dotenv.config();
import { connect } from 'mongoose';

async function connectDB() {
  try {
    connect(
      process.env.MONGOALATS_URI,
      {
        useNewUrlParser: true
      }
    );
    console.log('Connect sucessfully');
  } catch (error) {
    console.log('Connect failure' + error);
  }
}

export default connectDB;
