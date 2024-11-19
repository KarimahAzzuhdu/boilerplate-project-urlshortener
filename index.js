require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let arrayofURL = [{ original_url : 'https://freeCodeCamp.org', short_url : 1}];

app.post('/api/shorturl', (req, res) => {
  let oriURL = req.body.original;
  let shortURL = Math.floor(Math.random() * 10000); 

  if (isValidURL(oriURL)){
    arrayofURL.push({ original_url: oriURL, short_url: shortURL})
    res.json({
      original_url: oriURL,
      short_url: shortURL
    })
  } else {
    res.json({ error: 'invalid url' })
  }
})

app.get('/api/shorturl/:shortURLID', (req, res) => {
  let shortURL = req.params.shortURLID;
  let oriURL = arrayofURL[shortURL];

  if (true){
    res.json({
      original_url: oriURL,
      short_url: shortURL
    })
  } else {
    res.json({ error: 'invalid url' })
  }
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

function isValidURL(string_url){
  try {
    new URL(string_url);
    return true;
  } catch (err) {
    return false
  }
}
