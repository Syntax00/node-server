const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use(express.static(__dirname + '/public'));
app.use((request, response, next) => {
    let currentTime = new Date().toString();
    let logMessage = `${currentTime}: ${request.method} ${request.url}\n`;

    console.log(logMessage);

    fs.appendFile('server.log', logMessage, (err) => {
        if (err) {
            console.log('Could not append to server.log file')
        }
    })
    next();
});
app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: `Welcome to our home page`
    })
});

app.get('/json', (request, response) => {
    response.send({
        name: 'Mohamed Ahmed',
        age: 23,
        gender: 'Male',
        like: [
            'Coding',
            'UI/UX',
            'Football',
            'PlayStation'
        ]
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Something went wrong!'
    });
});

app.listen(port, () => console.log('Server is running ...'));