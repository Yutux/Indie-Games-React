import express from 'express';
import Game from '../models/gameModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res)=> {
    await Game.remove({});
    const createdGames = await Game.insertMany(data.Games);
    await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdGames, createdUsers});
});

export default seedRouter;