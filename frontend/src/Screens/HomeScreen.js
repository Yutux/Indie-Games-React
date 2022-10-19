import { useEffect, useReducer} from "react";
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import LoadingBox from '../Conponents/LoadingBox';
import Col from 'react-bootstrap/Col';
import ProdGame from '../Conponents/ProdGame';
import { Helmet } from "react-helmet-async";
import MessageBox from "../Conponents/MessageBox";
//import data from "../data";

const reducer = (state, action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, Games: action.payload, loading: false};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}; 

function HomeScreen() {

    const[{loading, error, Games}, dispatch] = useReducer(logger(reducer), {
        Games:[],
        loading: true, 
        error: '',
    });

    //const [Games, setGames] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'});
            try{
                const result = await axios.get('/api/Games');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            }catch(err){
                dispatch({type:'FETCH_FAIL', payload: err.message});
            }
            //setGames(result.data);
        };
        fetchData();
    }, []);
    return ( 
    <div>
        <Helmet>
            <title>Indie Games</title>
        </Helmet>
        <div className="games">
            {loading ?(
                <LoadingBox/>
            ): error ?(
                <MessageBox variant="danger">{error}</MessageBox>
            ): (
            <Row>
                {Games.map((Games) => (
                <Col key={Games.slug} sm={6} md={4} lg={3}>
                    <ProdGame Games={Games}></ProdGame>
                </Col>
                ))}
            </Row>
            )}
        </div>
    </div>
    );
}

export default HomeScreen;