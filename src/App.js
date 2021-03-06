import { useEffect, useReducer } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {
  loading: true,
  error: "",
  todos: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA': 
      return {
        loading: false,
        error: "",
        todos: action.payload
      }
    case 'SET_ERROR':
      return {
        loading: false,
        error: "There are some errors",
        todos: []
      }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(res => {
      dispatch({ type: 'SET_DATA', payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: 'SET_ERROR' })
    });
  }, [])

  const listmarkup = (
    <ListGroup>
      { state.todos.map( todo => {
        return (
          <ListGroupItem key={ todo.id } >
            { todo.title }
            { todo.completed ? ( <Badge color="success" className="ml-1">Completed</Badge> ) : 
            ( <Badge color="danger" className="ml-1">Incomplete</Badge> ) }
          </ListGroupItem> 
        )})}
    </ListGroup>
  )
  return (
    <div className="App">
      { state.loading ? 'Loading...' : ( state.error ? state.error : listmarkup ) }
    </div>
  );
}

export default App;
