import express from 'express';
import Game from '../models/gameModel.js';

const gameRouter = express.Router();

gameRouter.get('/', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});

gameRouter.get('/slug/:slug', async (req, res) => {
  const game = await Game.findOne({slug: {$eq: req.params.slug}});
  if (game) {
    res.send(game);
  } else {
    res.status(404).send({ message: 'Game Not Found' });
  }
});
gameRouter.get('/:id', async (req, res) => {
  const game = await Game.findById(req.params.id);
  if (game) {
    res.send(game);
  } else {
    res.status(404).send({ message: 'Game Not Found' });
  }
});

export default gameRouter;