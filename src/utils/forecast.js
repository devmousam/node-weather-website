const request = require('request')

const forecast = (latitude, longitude, callback) => {
    console.log('l-'+latitude+'Long-'+longitude)
    const url = 'https://api.darksky.net/forecast/9e4092b8280194862aaa44973640d784/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        console.log(body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast