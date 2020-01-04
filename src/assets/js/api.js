import axios from 'axios';

export default {
  url: 'https://api.infermedica.com/v2',
  headers() {
    return {
      'content-type': 'application/json',
      'App-Id': 'bd5268d8',
      'App-Key': '82b1fc19e535098e89f1a6bf39b74449'
    };
  },  
  search(data) {
    return axios({
      method: 'get',
      url: `${this.url}/search?phrase=${data.phrase}&sex=${data.sex}&max_results=3&type=symptom`,
      headers: this.headers(),      
    });
  },   
  diagnosis(data) {
    return axios({
      method: 'post',
      url: `${this.url}/diagnosis`,
      headers: this.headers(),
      data
    });
  },
  explain(data) {
    return axios({
      method: 'post',
      url: `${this.url}/explain`,
      headers: this.headers(),
      data
    });
  },
  triage(data) {
    return axios({
      method: 'post',
      url: `${this.url}/triage`,
      headers: this.headers(),
      data
    });
  }
};