const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 3000;
const environment = {
  fileDirectory: `${__dirname}/../data`
}

async function getLocalTextFile(fileName) {
  return (await fs.readFile(`${environment.fileDirectory}/${fileName}`)).toString();
}

function writeLocalFile(fileName, content) {
  return fs.writeFile(`${environment.fileDirectory}/${fileName}`, content);
}

async function addGameToCollection(fileName, game, response) {
  const game = typeof request.body === 'string' && request.body.trim();
  const file = await getLocalTextFile(fileName);
  if (!game) {
    response.send(file);
  } else {
    const gameCollection = JSON.parse(file);
    gameCollection.push(item);
    await writeLocalFile(fileName, JSON.stringify(gameCollection));
    response.json(gameCollection);
  }
}

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.text());

app.use(express.text());

app.post('/add-played-game', async (request, response) => {
  addGameToCollection('played-games.json', request.body, response);
});

app.post('/add-unplayed-game', async (request, response) => {
  addGameToCollection('unplayed-games.json', request.body, response);
});

app.get('/played-games', async (_, response) => {
  response.send(await getLocalTextFile('played-games.json'));
});

app.get('/unplayed-games', async (_, response) => {
  response.send(await getLocalTextFile('unplayed-games.json'));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
