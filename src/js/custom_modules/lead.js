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
  popupHtmlList(...leads) { // eslint-disable-line
    let html = '<div class="row people">';
    for (let i = 0; i < leads.length; i++) { // eslint-disable-line
      const lead = leads[i];
      const {id, date_submitted, first_name, last_name, email, x_title, x_companyname, x_udf_primary_market_segment122__ss_label} = lead; // eslint-disable-line
      const color = Object.prototype.hasOwnProperty.call(segmentColors, x_udf_primary_market_segment122__ss_label) ? segmentColors[x_udf_primary_market_segment122__ss_label] : '#c1c1c1';

      /* eslint-disable */
      html += `
      <div class="col-md-6 col-lg-4 item" data-id="${id}">
          <div class="author">
            <div class="rounded-circle-left">
              <div class="rounded-circle" style="background:${color};">
                ${this.nullToEmpty(first_name.charAt(0).toUpperCase())}${this.nullToEmpty(last_name.charAt(0).toUpperCase())}
              </div>
              <span class="date">${this.nullToEmpty(date_submitted.substring(5,10))}</span>
            </div>
              <div class="info">
                <h5 class="name"> ${this.nullToEmpty(first_name)} ${this.nullToEmpty(last_name)}</h5>
                <p class="intro">${this.nullToEmpty(email)}</p>
                <p class="intro">${this.nullToEmpty(x_title)}</p> 
                <p class="title">${this.nullToEmpty(x_companyname)}</p>
              </div> 
          </div>
      </div>`;
    }
    /* eslint-enable */
    html += '</div>';
    return html;
  }
  nullToEmpty(value) { // eslint-disable-line
    return (value == null) ? '' : value;
  }
  updateBadgeText(leads) { // eslint-disable-line
    const count = leads.length;
    chrome.browserAction.setBadgeText({ text: count + '' }); //eslint-disable-line
    return leads;
  }
  constructUrl(action) {
    return `${this.apiEndpoint}?c=${apiEndpoints.controller}&a=${apiEndpoints[action]}&cp[key]=${apiEndpoints.key}`;
  }
}
