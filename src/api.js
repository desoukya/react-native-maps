import _ from 'lodash';

module.exports = function(latitude, longitude) {

  var rootUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=f557b20727184231a597c710c8be3106';
  var url     = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  /**
  * Make async https requests (no require/import necessary)
  * @note: only HTTPS requests are allowed by default
  * @note: to enable HTTP requests, goto ios/info.plist and enable NSAllowsArbitraryLoads
  * @param {String} url
  * @return Promise
  */
  return fetch(url)
    .then((response) => {
      // response not immediately usable
      // must call response.json()
      // response.json() returns another promise
      return response.json()
    })
    .then((json) => {
      if (_.isUndefined(json)) {
        return {
          city: '',
          temperature: '',
          description: ''
        }
      } else {
        return {
          city: json.name,
          temperature: json.main.temp,
          description: json.weather[0].description
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
}
