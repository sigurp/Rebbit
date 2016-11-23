
const axios = require('axios');

const baseURL = process.env.BASEURL; // http://apis.is
const instance = axios.create({ baseURL });

/**
 * Fetches all available channels from endpoint, returns a promise that when
 * resolved returns an array, e.g.:
 * [{ name: 'Rúv', endpoint: '/tv/ruv' }, ... ]
 *
 * @returns {Promise} - Promise with available channels when resolved
 */
function channels() {
  return instance.get('/tv');
}

/**
 * Fetches schedule for a channel by name, returns an array, e.g.:
 * [{ title: '...', duration: '...', startTime: '...', ...}, ...]
 * If the channel does not exist, the empty array is returned.
 *
 * @param {string} name - Name of the channel
 * @returns {Promise} - Promise with schedule for channel when resolved
 */
function channel(name) {
  return channels().then((result) => {
    if (result.data && result.data.results.length > 0) {
      const channels1 = result.data.results[0].channels;
      let endpoint;
      channels1.map((channel1) => {
        if (channel1.name === name) {
          endpoint = channel1.endpoint;
        }
        return []; // return tómu til að fá ekki lint villu :/
      });
      if (endpoint) {
        return instance.get(endpoint);
      }
      return [];
    }
    return [];
  });
}

module.exports = {
  channels,
  channel,
};
