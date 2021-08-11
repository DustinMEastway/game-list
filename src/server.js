const express = require('express');
const app = express();
const port = 3000;

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.get('/played-games', (req, res) => {
  res.json([
    'Cyberpunk 20177',
    'Slay the Spire',
    'Kingdom: Two Crowns',
    'Flat Heroes',
    'Final Fantasy 14'
  ]);
});

app.get('/unplayed-games', (req, res) => {
  res.json([
    'Ratchet & Clank: Rift Apart',
    'Horizon Forbidden West',
    'Harry Potter Legacy',
    'Castle Crashers',
    'It Takes Two'
  ]);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
