import mongoose from 'mongoose';
import ROLE from './api/users/role.model.js';
import User from './api/users/user.model.js';

const options = {
  autoIndex: false, // Don't build indexes
  useNewUrlParser: true,
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
mongoose.set('debug', process.env.DEBUG);
mongoose
  .connect(process.env.LOCAL_MONGO_CONNECTION, options)
  .then(() => {
    console.log('MONGO CONNECTED');
  })
  .catch((err) => {
    console.log('er');
  });

const seedAdmin = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    password: 'Uteam2022!',
    role: ROLE.ADMIN,
  },
];

const seedDB = async () => {
  const admin = await User.findOne({ email: 'admin@example.com' });
  if (admin) return;
  await User.insertMany(seedAdmin);
};

seedDB().then(() => {
  mongoose.connection.close();
});

export default mongoose;
