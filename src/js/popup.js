import handlers from './modules/handlers';
import msg from './modules/msg';
import Lead from './custom_modules/lead';

let leads = null; //eslint-disable-line
const myMsg = msg.init('popup', handlers); //eslint-disable-line

function showDetails() {
  chrome.tabs.create({ url: `https://nexus.leica-geosystems.us/?c=Forms&a=detailedView&ap[form_key]=${this.dataset.auth_key}`}); //eslint-disable-line
  return false;
}

// ask the background script for our leads
myMsg.bg('getLeads', (theLeads) => {
  leads = theLeads;

  if (theLeads.length === 0) {
    document.getElementById('no_leads').classList = 'd-block';
  } else {
    document.getElementById('no_leads').classList = 'd-none';

    const container = document.createElement('section');
    container.classList.add('row', 'people');

    for (let i = 0; i < leads.length; i++) { // eslint-disable-line

      const lead = leads[i];
      const leadContainer = Lead.popupHtmlList(lead);
      leadContainer.addEventListener('click', showDetails, false);

      container.appendChild(leadContainer);
    }

    document.getElementById('lead_container').appendChild(container);
  }
});
