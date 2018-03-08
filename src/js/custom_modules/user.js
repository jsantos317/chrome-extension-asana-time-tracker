import asanaCredentials from '../credentials';
import Asana from './asana-min';

export default class User {
  constructor() {
    this.refresh_token = null;
    this.me = null;
    console.log(asanaCredentials); // eslint-disable-line no-console
  }

  authenticate() {
    const client = Asana.Client.create({
      clientId: asanaCredentials.clientId,
      clientSecret: asanaCredentials.clientSecret
    });
    client.users.me().then((me) => {
      console.log(me); // eslint-disable-line no-console
      this.me = me;
    });
  }
}
