import { useContext } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import MessageBox from "../Conponents/MessageBox";
import { Store } from "../Store";
import Button from "react-bootstrap/esm/Button";
import axios from 'axios';


export default function CartScreen(){
    const navigate = useNavigate();
    const {state, dispatch: ctxDispatch} = useContext(Store);
    const {
        cart: {cartItems},
    } = state;
    
    const updateCartHandeler = async(item, quantity)=> {
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
    const removeItemHandeler = (item) =>{
        ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item});
    };
    const checkoutHandeler = () => {
        navigate('/signin?redirect=/shipping');
    };
    return (
        <div>
            <Helmet>
                <title>
                    Inventory
                </title>
            </Helmet>
            <h1>Shopping Cart</h1>
            <Row>
                <Col md={8}>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Inventory is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ):(
                        <ListGroup>
                            {cartItems.map((item) => (
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img src={item.image} alt={item.name} className="img-fluid rounded img-thunbnail"></img>{' '}
                                        <Link to={`/Game/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="light" onClick={()=> updateCartHandeler(item, item.quantity - 1)} disabled={item.quantity === 1}>
                                            <i className="fas fa-minus-circle"></i>
                                        </Button>{' '}
                                        <span>{item.quantity}</span>{' '}
                                        <Button variant="light" onClick={()=> updateCartHandeler(item, item.quantity + 1)} disabled={item.quantity === item.countInStock}>
                                            <i className="fas fa-plus-circle"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3}>${item.price}</Col>
                                    <Col md={2}>
                                        <Button  onClick={()=> removeItemHandeler(item)} variant="light">
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            ))}
                    </ListGroup>
                    )}
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>
                                        SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                                        items) : $
                                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                                    </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <div className="d-grid">
                                        <Button type="button" onClick={checkoutHandeler} variant="primary" disabled={cartItems.length === 0}>Proceed to checkout</Button>
                                    </div>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}