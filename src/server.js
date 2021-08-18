const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;
const environment = {
  fileDirectory: `${__dirname}/../data`
}

async function getLocalFile(fileName) {
  return (await fs.readFile(`${environment.fileDirectory}/${fileName}`)).toString();
}

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());

app.use(express.text());

app.post('/add-played-game', async (request, response) => {
  const game = request.body.trim();
  console.log(request.body);
  response.send(`${game} back-end response`);
});

app.post('/add-unplayed-game', async (request, response) => {
  const game = request.body.trim();
  response.send(`${game} back-end response`);
});

app.get('/played-games', async (_, response) => {
  response.send(await getLocalFile('played-games.json'));
});

app.get('/unplayed-games', async (_, response) => {
  response.send(await getLocalFile('unplayed-games.json'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
