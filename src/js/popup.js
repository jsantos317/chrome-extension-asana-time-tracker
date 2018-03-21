import handlers from './modules/handlers';
import msg from './modules/msg';
import Lead from './custom_modules/lead';

let leads = null; //eslint-disable-line
const myMsg = msg.init('popup', handlers); //eslint-disable-line

// ask the background script for our leads
myMsg.bg('getLeads', (theLeads) => {
  leads = theLeads;

  if (theLeads.length === 0) {
    document.getElementById('no_leads').classList = 'd-block';
  } else {
    document.getElementById('no_leads').classList = 'd-none';
    const html = Lead.popupHtmlList(...theLeads);
    document.getElementById('lead_container').appendChild(html);
  }
});
