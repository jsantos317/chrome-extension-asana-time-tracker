import handlers from './modules/handlers';
import msg from './modules/msg';
import Lead from './custom_modules/lead';

const myLeads = new Lead();

handlers.getLeads = (callback) =>  {
  myLeads.getLeads().then((theLeads) => {
    callback(theLeads);
  });
};
msg.init('bg', handlers); //eslint-disable-line

// get leads every minute then update views
(function fetchAndUpdate() { //eslint-disable-line
  myLeads.fetchLeads()
    .then(leads => myLeads.updateBadgeText(leads))
    .then(setTimeout(fetchAndUpdate, 60000));
})();
