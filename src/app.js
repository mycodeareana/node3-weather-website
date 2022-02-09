const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// // console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));
const name = 'Mitty Frost';

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name,
        helpText: 'This is some helpful text.'
    });
});


app.get('/weather', (req, res) =>{
    const address = req.query.address;
    if (!address){
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        
        if (error){
            return res.send({
                error
            });
        }
    
        forecast(latitude, longitude, (error, { msg }) => {
             if (error){
                return res.send({
                    error
                });
            }
            res.send({
                forecast: msg,
                location,
                address
            });
            
        });
    });

    
});

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term!'
        });
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    // res.send('Help article not found');
    res.render('404', {
        title: '404 Page',
        name,
        helpText: 'Help article not found.'
    });
});

app.get('*',(req, res) =>{
    // res.send('My 404 page');
    res.render('404', {
        title: '404 Page',
        name,
        helpText: 'Page not found.'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000.');
});