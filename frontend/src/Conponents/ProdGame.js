import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Rating from './Rating';
import axios  from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function ProdGame(props){
    const {game} = props;

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {cartItems},
    } = state;
   
    const addToCartHandeler = async(item) => {
        const existItem = cartItems.find((x)=> x._id === game._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/games/${item._id}`);
        if(data.countInStock < quantity){
            window.alert('sorry. No more codes available');
            return ;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM', 
            payload: {...item, quantity}
        });
    };
    
    return(
    <Card>
        <Link to={`/game/${game.slug}`}>
            <img src={game.image} className="card-img-top" alt={game.name} />
        </Link>
        <Card.Body>
            <Link to={`/game/${game.slug}`}>
                <Card.Title>{game.name}</Card.Title>
            </Link>
            <Rating rating={game.rating} numReviews={game?.numReviews} />
            <Card.Text>{game.price}€</Card.Text>
            {game.countInStock === 0 ?
            ( <Button variant='light' disabled> Out of codes</Button> ) :
             (
            <Button onClick={() => addToCartHandeler(game)}>Add to cart</Button>
            )}
        </Card.Body>
    </Card>
    );
}
export default ProdGame;