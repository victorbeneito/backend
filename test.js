const express = require('express');
const app = express();

app.get('/test', (req, res) => res.send('Test OK'));

const listEndpoints = require('express-list-endpoints');
console.log(listEndpoints(app)); // Esperamos '/test' aquí

app.listen(3000);
