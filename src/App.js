import { useEffect, useReducer } from 'react';
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
    default:
      break;
  }
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
