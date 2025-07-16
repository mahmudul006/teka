// import mongoose from 'mongoose';
// import { config } from './env.js';

// export const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(config.MONGODB_URI);
    
//     console.log(`📊 MongoDB Connected: ${conn.connection.host}`);
    
//     // Handle connection events
//     mongoose.connection.on('error', (err) => {
//       console.error('MongoDB connection error:', err);
//     });
    
//     mongoose.connection.on('disconnected', () => {
//       console.warn('MongoDB disconnected');
//     });
    
//     return conn;
//   } catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   }
// }; 