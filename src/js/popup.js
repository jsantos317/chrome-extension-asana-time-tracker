import handlers from './modules/handlers';
import msg from './modules/msg';
import Lead from './custom_modules/lead';

const myLeads = new Lead();

const myMsg = msg.init('popup', handlers); //eslint-disable-line
myMsg.bg('getLeads', (theLeads) => {
  console.log('got leads from BG'); // eslint-disable-line no-console
  console.log(theLeads); // eslint-disable-line no-console
  const html = myLeads.popupHtmlList(...theLeads);
  document.getElementById('lead_container').innerHTML = html;
});
