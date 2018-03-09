import handlers from './modules/handlers';
import msg from './modules/msg';
// import form from './modules/form';
// import runner from './modules/runner';

// here we use SHARED message handlers, so all the contexts support the same
// commands. but this is NOT typical messaging system usage, since you usually
// want each context to handle different commands. for this you don't need
// handlers factory as used below. simply create individual `handlers` object
// for each context and pass it to msg.init() call. in case you don't need the
// context to support any commands, but want the context to cooperate with the
// rest of the extension via messaging system (you want to know when new
// instance of given context is created / destroyed, or you want to be able to
// issue command requests from this context), you may simply omit the
// `handlers` parameter for good when invoking msg.init()

console.log('POPUP SCRIPT WORKS!'); // eslint-disable-line no-console
handlers.popup = (myVar = 'default var') => { console.log(`test var: ${myVar}`); };

console.log(handlers); // eslint-disable-line no-console
const myMsg = msg.init('popup', handlers);

function sendAuthMsgToBg() {
  console.log('clicked'); // eslint-disable-line no-console
  myMsg.bg('authUser', (callback) => {
    console.log(callback); // eslint-disable-line no-console
  });
}
sendAuthMsgToBg();
// document.getElementById('asana_grant_permission').onclick = sendAuthMsgToBg;

// form.init(runner.go.bind(runner, msg.init('popup', handlers.create('popup'))));
