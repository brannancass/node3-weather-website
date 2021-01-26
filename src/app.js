const path = require('path')
const { response } = require('express') 
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Brannan Cass'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Brannan Cass'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help me!',
        name: 'Brannan Cass'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must supply an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error: 'Could not retrieve weather info'
            })
        }
        else {
            forecast(latitude, longitude, (error, { temp, feelsLike, weather } = {}) => {
                if (error) {
                    return res.send({
                        error: 'Could not retrieve weather info'
                    })
                }
                else {
                    res.send({
                        address: req.query.address,
                        temp: temp,
                        feelsLike: feelsLike,
                        weather: weather
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help page could not be found',
        name: 'Brannan Cass'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Your page could not be found',
        name: 'Brannan Cass'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})