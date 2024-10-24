import mongoose, { Mongoose } from "mongoose";

const DATABASE_URL = process.env.MONGODB_URI as string;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  var mongoose: MongooseCache; // Prevents TypeScript from complaining about global mongoose variable
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

global.mongoose = cached; // Assign cached globally

async function connectDB(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
