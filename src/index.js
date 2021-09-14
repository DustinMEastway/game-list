const environment = {
  urls: {
    api: 'http://localhost:3000'
  }
};

function addListItems(listElement, listName, items) {
  items.forEach((item, index) => {
    const deleteMethod = async () => {
      if (confirm(`Are you sure you want to remove ${item}?`)) {
        const games = await json(sendLocalRequest(`remove-${listName}-game`, { body: index, method: 'DELETE' }));
        setListItems(listElement, listName, games);
      }
    };

    addListItem(listElement, item, deleteMethod);
  });
}

function addListItem(listElement, item, deleteMethod) {
  const listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(item));

  const removeItemButton = document.createElement('button');
  removeItemButton.innerText = '-';
  removeItemButton.addEventListener('click', deleteMethod);
  listItem.appendChild(removeItemButton);

  listElement.appendChild(listItem);
}

function setListItems(listElement, listName, items) {
  listElement.innerHTML = '';
  addListItems(listElement, listName, items);
}

function sendLocalRequest(api, args) {
  return fetch(`${environment.urls.api}/${api}`, {
    headers: {
      'Content-Type': 'text/plain'
    },
    ...args
  });
}

async function json(response) {
  return (await response).json();
}

async function onAddGameClick(listName) {
  const game = prompt('Enter Game');
  const games = await json(sendLocalRequest(`add-${listName}-game`, { body: game, method: 'POST' }));
  const list = document.getElementById(`${listName}-list`);
  setListItems(list, listName, games);
}

async function updateLists() {
  const playedGameList = document.getElementById('played-list');
  const unplayedGameList = document.getElementById('unplayed-list');

  const gamePromises = [ 'played-games', 'unplayed-games' ].map((route) => json(sendLocalRequest(route)));
  const [ playedGames, unplayedGames ] = await Promise.all(gamePromises);
  setListItems(playedGameList, 'played', playedGames);
  setListItems(unplayedGameList, 'unplayed', unplayedGames);
}

async function main() {
  await updateLists();
}

main();
