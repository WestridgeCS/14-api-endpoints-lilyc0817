const generateBtn = document.getElementById('generateBtn');
const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
const container = document.getElementById('characterContainer');


generateBtn.addEventListener('click', async () => {
  const response = await fetch('/api/characters/random', {
    method: 'POST'
  });
  const character = await response.json();

  // add new character to the top
  container.prepend(createCharacterCard(character));
});

searchBtn.addEventListener('click', async () => {
  const text = searchBox.value;
  const response = await fetch(`/api/characters?search=${text}`);
  const characters = await response.json();

  renderCharacters(characters);
});


async function loadCharacters() {
  const response = await fetch('/api/characters');
  const characters = await response.json();

  renderCharacters(characters);
}


function renderCharacters(characters) {
  container.innerHTML = '';

  characters.forEach(character => {
    container.appendChild(createCharacterCard(character));
  });
}

function createCharacterCard(character) {
  const div = document.createElement('div');

  div.innerHTML = `
    <h3>${character.name}</h3>
    <p>${character.type} • ${character.trait}</p>
    <hr>
  `;

  return div;
}

loadCharacters();