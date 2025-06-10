import { getAuth } from 'firebase-admin/auth';
import app from './app';
import { config } from './config/config';
import { UserModel } from './database/auth/UserSchema';
import { connectToDatabase } from './database/connectToDatabase';
import { initFirebase } from './database/firebaseConnection';

const setupTownCouncilAccount = async () => {
  const email = 'comune@tellme.com';

  /**
   * Return if the user already exists
   */
  try {
    const userAlreadyExists = await getAuth().getUserByEmail(email);

    if (userAlreadyExists) {
      console.log('TownCouncil user already exists');
      return;
    }
  } catch (error) {}

  const user = await getAuth().createUser({
    email,
    password: config.townCouncilPwd,
  });

  await UserModel.insertOne({
    uid: user.uid,
    email: user.email,
    roles: ['townCouncil'],
  });
};

app.listen(config.port, async () => {
  console.log('connecting providers...');
  await connectToDatabase();
  await initFirebase();

  console.log(`Server running on port ${config.port}`);
  console.log('--------------------------------');

  //This function has to be called just one time to set-up the Town Council account
  setupTownCouncilAccount();
});
