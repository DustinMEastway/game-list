const express = require('express');
const fs = require('fs').promises;

const environment = {
  fileDirectory: `${__dirname}/../data`,
  port: 3000
}

const app = express();

async function getLocalTextFile(fileName) {
  return (await fs.readFile(`${environment.fileDirectory}/${fileName}`)).toString();
}

function writeLocalFile(fileName, content) {
  return fs.writeFile(`${environment.fileDirectory}/${fileName}`, content);
}

async function addGameToCollection(fileName, game, response) {
  game = typeof game === 'string' && game.trim();
  const file = await getLocalTextFile(fileName);
  if (!game) {
    response.send(file);
  } else {
    const gameCollection = JSON.parse(file);
    gameCollection.push(game);
    await writeLocalFile(fileName, JSON.stringify(gameCollection));
    response.json(gameCollection);
  }
}

async function removeGameFromCollection(fileName, index, response) {
  index = (typeof index === 'number') ? index : parseInt(index);
  let gameCollection = JSON.parse(await getLocalTextFile(fileName));
  if (index >= 0 && index < gameCollection.length) {
    gameCollection = gameCollection.slice(0, index).concat(gameCollection.slice(index + 1));
    await writeLocalFile(fileName, JSON.stringify(gameCollection));
  }
  response.json(gameCollection);
}

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());

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

app.delete('/remove-played-game', async (request, response) => {
  removeGameFromCollection('played-games.json', request.body, response);
});

app.delete('/remove-unplayed-game', async (request, response) => {
  removeGameFromCollection('unplayed-games.json', request.body, response);
});

app.get('/unplayed-games', async (_, response) => {
  response.send(await getLocalTextFile('unplayed-games.json'));
});

app.listen(environment.port, () => {
  console.log(`App listening at http://localhost:${environment.port}`);
});
