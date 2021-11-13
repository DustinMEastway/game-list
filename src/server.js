const express = require('express');
const fs = require('fs').promises;

const environment = {
  fileDirectory: `${__dirname}/../data`,
  port: 3000
}

const gameListsFileName = 'game-lists.json';

const app = express();

async function getLocalTextFile(fileName) {
  return (await fs.readFile(`${environment.fileDirectory}/${fileName}`)).toString();
}

function writeLocalFile(fileName, content) {
  return fs.writeFile(`${environment.fileDirectory}/${fileName}`, content);
}

async function addGameToList(listId, game, response) {
  game = typeof game === 'string' && game.trim();
  const lists = JSON.parse(await getLocalTextFile(gameListsFileName));
  const gameList = lists.find((list) => list.id === listId);
  if (game) {
    gameList.items.push(game);
    await writeLocalFile(gameListsFileName, JSON.stringify(lists));
  }
  response.json(gameList);
}

async function getGameList(listId, response) {
  const lists = JSON.parse(await getLocalTextFile(gameListsFileName));
  return lists.find((list) => list.id === listId);
}

async function removeGameFromList(listId, index, response) {
  index = (typeof index === 'number') ? index : parseInt(index);
  const lists = JSON.parse(await getLocalTextFile(gameListsFileName));
  const gameList = lists.find((list) => list.id === listId);
  if (index >= 0 && index < gameList.items.length) {
    gameList.items.splice(index, 1);
    await writeLocalFile(gameListsFileName, JSON.stringify(lists));
  }
  response.json(gameList);
}

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(express.json());

app.use(express.text());

app.use(express.static('./src/public'))

app.post('/add-played-game', async (request, response) => {
  addGameToList('0', request.body, response);
});

app.post('/add-unplayed-game', async (request, response) => {
  addGameToList('1', request.body, response);
});

app.get('/played-games', async (_, response) => {
  response.send(await getGameList('0'));
});

app.delete('/remove-played-game', async (request, response) => {
  removeGameFromList('0', request.body, response);
});

app.delete('/remove-unplayed-game', async (request, response) => {
  removeGameFromList('1', request.body, response);
});

app.get('/unplayed-games', async (_, response) => {
  response.send(await getGameList('1'));
});

app.listen(environment.port, () => {
  console.log(`App listening at http://localhost:${environment.port}`);
});
