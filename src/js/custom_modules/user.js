import asanaCredentials from '../credentials';
import Asana from './asana-min';

export default class User {
  constructor() {
    console.log(asanaCredentials); // eslint-disable-line no-console
  }
  authenticate() {
    const client = Asana.Client.create(asanaCredentials);
    const promise = client.users.me();
    promise.then((data) => {
      Object.assign(this, data);
      console.log(data); // eslint-disable-line no-console
      console.log(this); // eslint-disable-line no-console
    });
    return promise;
  }
}
