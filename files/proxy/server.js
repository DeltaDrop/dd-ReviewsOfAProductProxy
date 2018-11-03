const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3004;
const axios = require('axios');
const bodyParser = require('body-parser');
const circularJson = require('circular-json');
const cors = require('cors');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

app.get('/buy/:productName', (err, res) => {
  res.sendFile(path.resolve('public/index.html'))
})
app.get('/api/:prod_name', (req, res)=> {
  axios.get(`http://18.224.199.183${req.url}`)
  .then(data => {
    res.status(200).send(circularJson.stringify(data))
  })
  .catch(err => {console.log(err, ' err in get productinfo item in proxy')})
})

app.get('/api/categories/:prod_name', (req, res)=> {
  axios.get(`http://18.224.199.183${req.url}`)
  .then(data => {
    res.status(200).send(circularJson.stringify(data))
  })
  .catch(err => {console.log(err, ' err in get productinfo category in proxy')})
})

app.post('/api/drop', (req, res) => {
  axios.get(`http://18.224.199.183${req.url}`)
  .then(data => {
    res.status(200).send(circularJson.stringify(data))
  })
  .catch(err => {console.log(err, ' err in get productinfo drop in proxy')})
})

app.get('/api/:productName/reviews', (req, res)=> {
  axios.get(`http://ec2-54-89-153-231.compute-1.amazonaws.com${req.url}`)
  .then(data => {
    res.status(200).send(circularJson.stringify(data))
  })
  .catch(err => {console.log(err, ' err in get reviews in proxy')})
})

app.post('/api/:productName/reviews/search', (req, res) => {

})

app.get('/api/:prod_name/overview', (req, res)=> {
  axios.get(`http://localhost:3003${req.url}`)
  .then(data => {
    res.status(200).send(circularJson.stringify(data))
  })
  .catch(err => {console.log(err, ' err in get overview in proxy')})
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});