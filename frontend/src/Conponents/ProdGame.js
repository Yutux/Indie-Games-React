import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function ProdGame(props){
    const {Games} = props;
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {cartItems},
    } = state;
    
    const addToCartHandeler = async(item, )=> {
        const existItem = cartItems.find((x)=> x._id === item._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/Games/${item._id}`);
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
        <Link to={`/game/${Games.slug}`}>
            <img src={Games.image} className="card-img-top" alt={Games.name} />
        </Link>
        <Card.Body>
            <Link to={`/game/${Games.slug}`}>
                <Card.Title>{Games.name}</Card.Title>
            </Link>
            <Card.Text>{Games.price}</Card.Text>
            <Rating rating={Games.rating} numReviews={Games.numReviews}></Rating>
            {Games.countInStock === 0 ?( <Button variant='light' disabled> Out of codes</Button> ) : (
            <Button onClick={() => addToCartHandeler(Games)}>Add to cart</Button>
            )}
        </Card.Body>
    </Card>
    );
}
export default ProdGame;