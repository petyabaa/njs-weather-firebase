const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { allowedNodeEnvironmentFlags } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// DEfine paths for Exp config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup handlebars engine and views location
app.set('view engine', 'hbs')

//Setup static dir to serve
app.use(express.static(path.join(__dirname, '../public')))
app.use('/firebase', express.static(path.join(__dirname, '../node_modules/firebase')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'JNP'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'JNP'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is a help message',
    title: 'Help',
    name: 'JNP'
  })
})


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, {degree, feels} = {}) => {
        if (error) {
            return res.send({
              error
            })
        }

        res.send({
          address: req.query.address,
          latitude,
          longitude,
          location,
          degree,
          feels
        })
    })
})

  console.log(req.query.address)
/*   res.send({
    forecast: 'Its showing',
    location: 'Boston',
    address: req.query.address
  }) */
})

app.get('/products', (req, res) => {
if (!req.query.search) {
  return res.send({
    error: 'You must provide a search term'
  })
} 

  console.log(req.query.search)
  res.send({
    product: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('no-help', {
    error: 'Help article not found!',
    name: 'Peter'
  })
})

//404
app.get('*', (req, res) => {
  res.render('404', {
    error: 'Page not found',
    name: 'Peter'
  })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})