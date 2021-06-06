import { useEffect, useReducer } from 'react';
import axios from 'axios';
import './App.css';

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
      console.log(res.data)
      dispatch({ type: 'SET_DATA', payload: res.data });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: 'SET_ERROR' })
    });
  }, [])

  const listmarkup = <div>List markup</div>
  return (
    <div className="App">
      { state.loading ? 'Loading...' : listmarkup }
      { state.error ? state.error : null }
    </div>
  );
}

export default App;
