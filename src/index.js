const playedGames = [
  'Cyberpunk 20177',
  'Slay the Spire',
  'Kingdom: Two Crowns',
  'Flat Heroes',
  'Final Fantasy 14',
];

const unplayedGames = [
  'Ratchet & Clank: Rift Apart',
  'Horizon Forbidden West',
  'Harry Potter Legacy',
  'Castle Crashers',
  'It Takes Two'
];

function createList(listElement, games) {
  games.forEach((game) => {
    const listItem = document.createElement('li');
    listItem.innerText = game;
    listElement.appendChild(listItem);
  });
}

function main() {
  createList(document.getElementById('played-list'), playedGames);
  createList(document.getElementById('unplayed-list'), unplayedGames);
}

main();
