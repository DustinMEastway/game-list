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

function setListItems(listElement, items) {
  listElement.innerHTML = '';
  addListItems(listElement, items);
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
  const games = await json(postLocalText(`add-${name}-game`, game));
  const list = document.getElementById(`${name}-list`);
  setListItems(list, games);
}

async function updateLists() {
  const playedGameList = document.getElementById('played-list');
  const unplayedGameList = document.getElementById('unplayed-list');

  const gamePromises = [ 'played-games', 'unplayed-games' ].map((route) => getLocalJson(route));
  const [ playedGames, unplayedGames ] = await Promise.all(gamePromises);
  setListItems(playedGameList, playedGames);
  setListItems(unplayedGameList, unplayedGames);
}

async function main() {
  await updateLists();
}

main();
