const axios = require('axios');
const apiUrl = 'http://localhost:8000/api/';

export default {
    getHeaders() {
        let token = window.localStorage.getItem('token');
        if (token == null) {
            return {};
        }
        return {Authorization: 'Bearer ' + token};
    },

    get(url, parrams) {
        return axios.get(apiUrl + url, {
                parrams,
                headers: this.getHeaders()
            }
        )
    },

    post(url, data) {
        return axios.post(apiUrl + url, data, {
                headers: this.getHeaders()
            }
        )
    }
}