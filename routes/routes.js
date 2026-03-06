import express from 'express';
import Character from '../models/Character.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index');
});

/* API ENDPOINT */

router.get('/api/characters', async (req, res) => {
  const { search, type } = req.query;
  const filter = {};

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  if (type) {
    filter.type = type;
  }

  const characters = await Character.find(filter).sort({ name: 1 });
  res.json(characters);
});

router.post('/api/characters/random', async (req, res) => {
  try {
    const names = [
      'Thorgar',
      'Elowyn',
      'Fenric',
      'Lunara',
      'Brom',
      'Kaelin',
      'Zareth',
      'Nyssa'
    ];

    const types = [
      'Wizard',
      'Barbarian',
      'Rogue',
      'Paladin',
      'Cleric',
      'Ranger'
    ];

    const traits = [
      'Brave',
      'Cunning',
      'Wise',
      'Fierce',
      'Mysterious',
      'Loyal'
    ];

    function random(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    const character = new Character({
      name: random(names),
      type: random(types),
      trait: random(traits)
    });

    await character.save();

    res.json(character);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});