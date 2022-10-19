import {BrowserRouter, Route, Routes} from 'react-router-dom';
import HomeScreen from "./Screens/HomeScreen";
import GameScreen from './Screens/GameScreen';
import Navbar from 'react-bootstrap/Navbar';
import NavDropDown from 'react-bootstrap/NavDropdown';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap';
import Badge from 'react-bootstrap/Badge';
import Nav from 'react-bootstrap/Nav';
import { useContext } from 'react';
import { Store } from './Store';
import { Link } from 'react-router-dom';
import CartScreen from './Screens/CartScreen';
import SigninScreen from './Screens/SigninScreen';
import ShippingAddressScreen from './Screens/ShippingAddressScreen';
import SignupScreen from './Screens/SignupScreen';
import PaymentMethodScreen from './Screens/PaymentMethodeScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import OrderHistoryScreen from './Screens/OrderHistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';




function App() {

  const {state, dispatch: ctxDispatch} = useContext(Store);
  const {cart, userInfo} = state;
  
  const logoutHandler = () => {
    ctxDispatch({type: 'USER_LOGOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    window.location.href = '/signin';
  };

  return (
    <BrowserRouter>
    <div className='d-flex flex-column site-container'>
      <ToastContainer position="bottom-center" limit={1}/>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">

          <Container >
          <LinkContainer to="/">
              <Navbar.Brand>Indie Games</Navbar.Brand>
            </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto  w-100  justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Inventory
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropDown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropDown.Item>User Profile</NavDropDown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropDown.Item>Order History</NavDropDown.Item>
                      </LinkContainer>
                      <NavDropDown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={logoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropDown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/game/:slug" element={<GameScreen/>}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/signup" element={<SignupScreen />}></Route>
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>

            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <footer>
        <div className='text-center'>All rights reserved</div>
      </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
