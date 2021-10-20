const path = require('path');
const hbs = require('hbs');
const express = require('express');
const { hasSubscribers } = require('diagnostics_channel');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials')
const app = express();

//Setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirPath));

// app.get('/',(req,res)=>{
//     res.send('hi');
// });

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: "Dharambir Kumar"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About weather",
        name: "Dharambir Kumar"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: "Weather-app help page",
        name: "Dharambir Kumar"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please enter address!"
        })
    }
    geocode(req.query.address, (error, geocodeData) => {
        // console.log(geocodeData);
        const lat = geocodeData.latitude;
        const long = geocodeData.long;
        if (!error) {
            forecast(lat, long, (error, forecastData) => {
                // console.log(error);
                const temperature = forecastData.current.temperature
                    // console.log(forecastData);
                return res.send(forecastData);
                // res.send({
                //     location: 'Laxmi Nagar, New Delhi',
                //     forecast: 'Temp ' + temperature + ' C',
                //     address: req.query.address
                // })
            })
        } else {
            return res.send({
                error: "Unable to search location!"
            })
        }
    })

});


app.get('*', (req, res) => {
    res.render('404');
})
app.listen(8000, () => {
    console.log("Server start running on post : 8000");
});