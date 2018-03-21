import { apiEndpoints, segmentColors } from '../settings';

export default class Lead {
  constructor() {
    this.leads = null;
    this.apiEndpoint = 'https://nexus.microsurvey.com';
  }
  fetchLeads() {
    const url = this.constructUrl('getMyLeads');
    return fetch(url)
      .then((response) => {
        this.leads = response.json();
        return this.leads;
      });
  }
  getLeads() {
    return this.leads;
  }
  static popupHtmlList(...leads) {
    const container = document.createElement('section');
    container.classList.add('row', 'people');

    for (let i = 0; i < leads.length; i++) { // eslint-disable-line
      const lead = leads[i];
      const {id, date_submitted, first_name, last_name, email, x_title, x_companyname, x_udf_primary_market_segment122__ss_label} = lead; // eslint-disable-line
      const color = Lead.getColor(x_udf_primary_market_segment122__ss_label);

      /* eslint-disable */
      let leadContainer = document.createElement('article');
      leadContainer.classList.add('col-md-6', 'col-lg-4', 'item', 'nexus_lead');
      leadContainer.dataset.id = id;
      leadContainer.addEventListener('click', Lead.getDetails, false);

      const html = `
          <summary class="author">
            <figure class="rounded-circle-left">
              <figcaption class="rounded-circle" style="background:${color};">
                ${Lead.nullToEmpty(first_name.charAt(0).toUpperCase())}${Lead.nullToEmpty(last_name.charAt(0).toUpperCase())}
              </figcaption>
              <figcaption class="date">${Lead.nullToEmpty(date_submitted.substring(5,10))}</figcaption>
            </figure>
              <div class="info">
                <h5 class="name"> ${Lead.nullToEmpty(first_name)} ${Lead.nullToEmpty(last_name)}</h5>
                <p class="intro">${Lead.nullToEmpty(email)}</p>
                <p class="intro">${Lead.nullToEmpty(x_title)}</p> 
                <p class="title">${Lead.nullToEmpty(x_companyname)}</p>
              </div> 
          </summary>`;

      leadContainer.innerHTML = html;
      container.appendChild(leadContainer);
    }
    /* eslint-enable */
    return container;
  }
  static getDetails(evt) {
    console.log('clicked!');
    console.log(evt);
  }
  static getColor(segment) {
    return Object.prototype.hasOwnProperty.call(segmentColors, segment) ? segmentColors[segment] : '#c1c1c1';
  }
  static nullToEmpty(value) {
    return (value == null) ? '' : value;
  }
  static updateBadgeText(leads) {
    const count = leads.length;
    chrome.browserAction.setBadgeText({ text: count + '' }); //eslint-disable-line
    return leads;
  }
  constructUrl(action) {
    return `${this.apiEndpoint}?c=${apiEndpoints.controller}&a=${apiEndpoints[action]}&cp[key]=${apiEndpoints.key}`;
  }
}
