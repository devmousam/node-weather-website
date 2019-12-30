const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const port = process.env.PORT || 3000

// Express path configuration
const staticPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Geo library
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// view configuration
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// page render
app.get('', (req, res) => {
    res.render('index', {
        title: 'Homee',
        name: 'mousam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'mousam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'mousam'
    })
})

//const address = process.argv[2]

app.get('/weather', (req, res) => {  
    const address = req.query.address
    if(!req.query.address) {
        return res.send({
            'error': 'Please check' 
        })
    } else {
        geocode(address, (error, { latitude, longitude, location }) => {
            if (error) {
                return console.log(error)
            }
    
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return console.log(error)
                }

                res.send({
                    'location': location,
                    'forecastData': forecastData
                })
    
                console.log(location)
                console.log(forecastData)
            })
        })
    }
})


// Express static path configuration
app.use(express.static(staticPath))



// server configuration
app.listen(port, () => {
    console.log('Server started' . port)
})