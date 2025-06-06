import { config } from '../../../config/config';

export const TEST_USERS = {
  citizen: {
    email: 'test@citizen.com',
    password: 'hello@citizen15',
  },
  agency: {
    email: 'test@agency.com',
    password: 'hello@agency15',
  },
  townCouncil: {
    email: 'comune@tellme.com',
    password: config.townCouncilPwd,
  },
};
