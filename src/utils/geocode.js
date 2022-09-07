const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token='+access_key+'&limit=1'
   
    request({
       url,
       json: true
    }, (error, {body}) => {
 //      const data = response.body
   
       if (error) {
           callback('Unable to connect geocoding service!')
       } else if (body.features.length == 0) {
           callback('No geoloc match found!')
       } else {
           callback(undefined, {
               longitude: body.features[0].center[1],
               latitude: body.features[0].center[0],
               location: body.features[0].place_name
           })
       }
    })
}

module.exports = geocode