import axios from "axios";
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Rating from "../Conponents/Rating";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../Conponents/LoadingBox";
import MessageBox from "../Conponents/MessageBox";
import { getError } from "../Utils";
import { Store } from "../Store";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { toast } from 'react-toastify';

const reducer = (state, action) =>{
    switch(action.type){
        case 'GAME':
            return { ...state, game: action.payload };
        case 'CREATE_REQUEST':
            return { ...state, loadingCreateReview: true };
        case 'CREATE_SUCCESS':
            return { ...state, loadingCreateReview: false };
        case 'CREATE_FAIL':
            return { ...state, loadingCreateReview: false };
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, game: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state
    }
}; 

function GameScreen(){
    let reviewsRef = useRef();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [selectedImage, setSelectedImage] = useState('');

    const params= useParams();
    const navigate = useNavigate();
    const {slug}= params;

    const [{ loading, error, game, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      game: [],
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
    const { cart, userInfo } = state;
    const addToCartHandler = async() =>{
        const existItem = cart.cartItems.find((x)=> x._id === game._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`/api/Games/${game._id}`);
        if(data.countInStock < quantity){
            window.alert('sorry. No more codes available');
            return ;
        }
        ctxDispatch({
            type: 'CART_ADD_ITEM', 
            payload: {...game, quantity}
        });
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!comment || !rating) {
          toast.error('Please enter comment and rating');
          return;
        }
        try {
          const { data } = await axios.post(
            `/api/games/${game._id}/reviews`,
            { rating, comment, name: userInfo.name },
            {
              headers: { Authorization: `Bearer ${userInfo.token}` },
            }
          );
    
          dispatch({
            type: 'CREATE_SUCCESS',
          });
          toast.success('Review submitted successfully');
          game.reviews.unshift(data.review);
          game.numReviews = data.numReviews;
          game.rating = data.rating;
          dispatch({ type: 'REFRESH_GAME', payload: game });
          window.scrollTo({
            behavior: 'smooth',
            top: reviewsRef.current.offsetTop,
          });
        } catch (error) {
          toast.error(getError(error));
          dispatch({ type: 'CREATE_FAIL' });
        }
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
                    <img className="img-large" src={selectedImage || game.image} alt={game.name}></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{game.name}</title>
                            </Helmet>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={game.rating} numReviews={game.numReviews}>

                            </Rating>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${game.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Row xs={1} md={2} className="g-2">
                            {[game.image, ...game.images].map((x) => (
                            <Col key={x}>
                              <Card>
                                <Button
                                  className="thumbnail"
                                  type="button"
                                  variant="light"
                                  onClick={() => setSelectedImage(x)}
                                >
                                  <Card.Img variant="top" src={x} alt="game" />
                                </Button>
                              </Card>
                            </Col>
                            ))}
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description
                            <p>{game.description}</p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${game.price}</Col>
                                </Row>
                            </ListGroup>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{game.countInStock>0? (<Badge bg="success">In Stock</Badge>):(
                                        <Badge bg="danger">Unavailable</Badge>)}</Col>
                                    </Row>
                                </ListGroup.Item>
                                {game.countInStock > 0 && (
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
            <div className="my-3">
        <h2 ref={reviewsRef}>Reviews</h2>
        <div className="mb-3">
          {game.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <ListGroup>
          {game.reviews.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/games/${game.slug}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
        </div>
       )
    )
}
export default GameScreen;