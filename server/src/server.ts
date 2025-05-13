import app from './app';
import { config } from './config/config';
import { connectToDatabase } from './database/connectToDatabase';
import { initFirebase } from './database/firebaseConnection';

connectToDatabase();
initFirebase();

app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port}`);
  // console.log();
});
