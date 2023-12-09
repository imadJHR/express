
const express = require('express');
const app = express();

// Custom middleware to check if it's working hours
const isWorkingHour = (req, res, next) => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    if (day < 1 || day > 5 || hour < 9 || hour > 17) {
        return res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }

    next();
};


app.set('view engine', 'ejs');

app.get('/', isWorkingHour, (req, res) => {
    res.render('home');
});

app.get('/our-services', isWorkingHour, (req, res) => {
    res.render('our-services');
});

app.get('/contact-us', isWorkingHour, (req, res) => {
    res.render('contact-us');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});