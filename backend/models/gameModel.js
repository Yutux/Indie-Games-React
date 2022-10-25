import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );
  

const gameSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true },
        category: { type: String, required: true },
        image:{ type: String, required: true },
        images: [String],
        price: { type: Number, required: true },
        countInStock:{ type: Number, required: true },
        gameDeveloper:{ type: String, required: true },
        rating:{ type: Number, required: true },
        numReviews:{ type: Number, required: true },
        description:{ type: String, required: true },
        reviews: [reviewSchema],
    },
    {
       timestamps: true 
    }

);
const Game = mongoose.model('Game', gameSchema);
export default Game;

