import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Game from '../models/gameModel.js';
import { isAuth, isAdmin } from '../utils.js';


const gameRouter = express.Router();

gameRouter.get('/', async (req, res) => {
  const games = await Game.find();
  res.send(games);
});


gameRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newGame = new Game({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: '/image/p1.jpg',
      price: 0,
      category: 'sample category',
      gameDeveloper: 'sample gameDeveloper',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    });
    const game = await newGame.save();
    res.send({ message: 'Game Added', game });
  })
);

gameRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (game) {
      game.name = req.body.name;
      game.slug = req.body.slug;
      game.price = req.body.price;
      game.image = req.body.image;
      game.category = req.body.category;
      game.gameDeveloper = req.body.gameDeveloper;
      game.countInStock = req.body.countInStock;
      game.description = req.body.description;
      await game.save();
      res.send({ message: 'Game Updated' });
    } else {
      res.status(404).send({ message: 'Game Not Found' });
    }
  })
);

gameRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const game = await Game.findById(req.params.id);
    if (game) {
      await game.remove();
      res.send({ message: 'Game Deleted' });
    } else {
      res.status(404).send({ message: 'Game Not Found' });
    }
  })
);

gameRouter.post(
  '/:id/reviews',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);
    if (game) {
      if (game.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      game.reviews.push(review);
      game.numReviews = game.reviews.length;
      game.rating =
        game.reviews.reduce((a, c) => c.rating + a, 0) /
        game.reviews.length;
      const updatedGame = await game.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedGame.reviews[updatedGame.reviews.length - 1],
        numReviews: game.numReviews,
        rating: game.rating,
      });
    } else {
      res.status(404).send({ message: 'Game Not Found' });
    }
  })
);


const PAGE_SIZE = 3;

gameRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const games = await Game.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countGames = await Game.countDocuments();
    res.send({
      games,
      countGames,
      page,
      pages: Math.ceil(countGames / pageSize),
    });
  })
);

gameRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            // 1-50
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const games = await Game.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countGames = await Game.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      games,
      countGames,
      page,
      pages: Math.ceil(countGames / pageSize),
    });
  })
);


gameRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Game.find().distinct('category');
    res.send(categories);
  })
);


gameRouter.get('/slug/:slug', async (req, res) => {
  const game = await Game.findOne({ slug: req.params.slug });
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