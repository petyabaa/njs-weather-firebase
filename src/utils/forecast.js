const request = require('postman-request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key='+access_key+'&query='+ lat + ',' + long + '&units=m'
    
    request({
        url, 
        json: true
    }, (error, {body}) => {
        if (error) {
            callback('Unable to connect weather service!')
        } else if (body.success == false) {
            callback('Its an error! Code: ' + body.error.code + ' Type: ' + body.error.type)
        } else {
            callback(undefined, {
                degree: body.current.temperature,
                feels: body.current.feelslike
            })
        }
    })
}

module.exports = forecast