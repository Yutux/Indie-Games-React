import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../Conponents/Rating";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Conponents/LoadingBox";
import MessageBox from "../Conponents/MessageBox";
import { getError } from "../Utils";
import { Store } from "../Store";


const reducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, Game: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}; 

function GameScreen(){
    const params= useParams();
    const navigate = useNavigate();
    const {slug}= params;

    const[{loading, error, Game}, dispatch] = useReducer(reducer, {
        Game:[],
        loading: true, 
        error: '',
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try{
                const result = await axios.get(`/api/Games/slug/${slug}`);
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload: getError(err)});
            }
            //setGames(result.data);
        };
        fetchData();
    }, [slug]);

    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {cart} = state;
    const addToCartHandler = async() =>{
        const existItem = cart.cartItems.find((x)=> x._id === Game._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/Games/${Game._id}`);
        if(data.countInStock < quantity){
            window.alert('sorry. No more codes available');
            return ;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM', 
            payload: {...Game, quantity}
        });
        navigate('/cart');
    };
    return (
        loading ? (
            <LoadingBox/>
        ): error ?(
            <MessageBox variant="danger">{error}</MessageBox>
        ): (
        <div>
            <Row>
                <Col md={6}>
                    <img className="img-large" src={Game.image} alt={Game.name}></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{Game.name}</title>
                            </Helmet>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={Game.rating} numReviews={Game.numReviews}>

                            </Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${Game.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description
                            <p>{Game.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${Game.price}</Col>
                                </Row>
                            </ListGroup>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{Game.countInStock>0? (<Badge bg="success">In Stock</Badge>):(
                                        <Badge bg="danger">Unavailable</Badge>)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {Game.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button onClick={addToCartHandler} variant="primary">
                                                Add to cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
       )
    )
}
export default GameScreen;