import asanaCredentials from '../credentials';
import Asana from './asana-min';

export default class User {
  constructor() {
    this.client = Asana.Client.create(asanaCredentials);
  }
  authenticate() {
    this.client.useOauth();
    return this.client.authorize().then(this.getUser);
  }
  getUser() {
    return this.client.users.me().then((data) => {
      Object.assign(this, data);
      console.log(data); // eslint-disable-line no-console
      console.log(this); // eslint-disable-line no-console
      return data;
    }).catch((err) => {
      console.log(err); // eslint-disable-line no-console
    });
  }
}
