const express = require('express');
const { readFile } = require('fs').promises;
const app = express();
const port = 3000;
const environment = {
  fileDirectory: __dirname + '/../data'
}

async function sendFile(response, fileName) {
  response.send(
    (await readFile(fileName)).toString()
  );
}

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


app.get('/played-games', (_, response) => {
  sendFile(response, `${environment.fileDirectory}/played-games.json`)
});

app.get('/unplayed-games', (_, response) => {
  sendFile(response, `${environment.fileDirectory}/unplayed-games.json`)
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
