require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('URI:', process.env.MONGODB_URI ? 'Found' : 'Not found');

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB connection successful!');
  console.log('Database name:', mongoose.connection.name);
  process.exit(0);
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});