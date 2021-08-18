const environment = {
  urls: {
    api: 'http://localhost:3000'
  }
};

function addListItems(listElement, items) {
  items.forEach((item) => {
    addListItem(listElement, item);
  });
}

function addListItem(listElement, item) {
  const listItem = document.createElement('li');
  listItem.innerText = item;
  listElement.appendChild(listItem);
}

function getLocalJson(api) {
  return json(fetch(`${environment.urls.api}/${api}`));
}

function postLocalText(url, body) {
  return fetch(`${environment.urls.api}/${url}`, {
    body,
    headers: {
      'Content-Type': 'text/plain'
    },
    method: 'POST'
  });
}

async function json(response) {
  return (await response).json();
}

async function onAddGameClick(name) {
  const game = prompt('Enter Game');
  const newGame = await postLocalText(`add-${name}-game`, game);
  console.log(await newGame.text());
}

async function updateLists() {
  const playedGameList = document.getElementById('played-list');
  const unplayedGameList = document.getElementById('unplayed-list');

  const gamePromises = [ 'played-games', 'unplayed-games' ].map((route) => getLocalJson(route));
  const [ playedGames, unplayedGames ] = await Promise.all(gamePromises);
  playedGameList.innerHTML = '';
  addListItems(playedGameList, playedGames);
  unplayedGameList.innerHTML = '';
  addListItems(unplayedGameList, unplayedGames);
}

async function main() {
  await updateLists();
}

main();
