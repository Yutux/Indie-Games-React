import Express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import gameRouter from './routes/gameRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';



dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=> {
    console.log('connect to db')
}).catch(err =>{
    console.log(err.message);
});

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true}));

app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
  });
  

app.use('/api/seed', seedRouter);
app.use('/api/games', gameRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

const_dirname = path.resolve();
app.use(express.static(path.join(_dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);


app.use((err, req, res, next) => {
    res.status(500).send({message: err.message});
});

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`serve at http:://localhost:${port}`);
});