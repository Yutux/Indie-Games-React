import Spinner from 'react-bootstrap/Spinner';

export default function LoadingBox(){
    return (<Spinner animation="border" role="statux">
        <span className="visually-hidden">loading...</span>
    </Spinner>);
}