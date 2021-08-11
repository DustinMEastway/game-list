const environment = {
  urls: {
    api: 'http://localhost:3000'
  }
};

function createList(listElement, games) {
  games.forEach((game) => {
    const listItem = document.createElement('li');
    listItem.innerText = game;
    listElement.appendChild(listItem);
  });
}

async function getJson(api) {
  return (await fetch(api)).json();
}

async function main() {
  const [ playedGames, unplayedGames ] = await Promise.all([
    getJson(`${environment.urls.api}/played-games`),
    getJson(`${environment.urls.api}/unplayed-games`)
  ]);
  createList(document.getElementById('played-list'), playedGames);
  createList(document.getElementById('unplayed-list'), unplayedGames);
}

main();
