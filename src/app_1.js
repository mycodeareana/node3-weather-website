const path = require('path');
const express = require('express');

console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname, '../public'));

const app = express();

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

// app.com
// app.com/help
// app.com/about

// app.get('', (req, res) =>{
//     res.send('<h1>Weather</h1>');
// });

// app.get('/help', (req, res) =>{
//     res.send([
//         {
//             name: 'Mitty',
//             age: 45
//         },
//         {
//             name: 'Andrew',
//             age: 32
//         }
//     ]);
// });

// app.get('/about', (req, res) =>{
//     res.send('<h1>About</h1>');
// });

app.get('/weather', (req, res) =>{
    res.send({
        forecast: 'It is 30 degree.',
        location: 'Bangkok'
    });
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000.');
});