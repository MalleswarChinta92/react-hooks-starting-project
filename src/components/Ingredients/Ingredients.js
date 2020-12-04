import React, {useReducer, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (userIngredients, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...userIngredients, action.ingredient]
    case 'DELETE':
      return userIngredients.filter((ing) => ing.id !== action.id);
    default:
      return new Error("Shouldn't reach");
  }
}

const httpReducer = (httpState, action) => {
  switch(action.type) {
    case 'SEND':
      return {loading: true, error: null};
    case 'RESPONSE':
      return {loading: false, error: null};
    case 'ERROR':
      return {loading: true, error: action.error};
    case 'CLEAR':
      return {loading: false, error: null};
    default:
      return new Error("Shouldn't reach");
  }
}

const Ingredients = () => {
  // const [userIngredients, setUserIngredients] = useState([])
  // const [isLoading, setLoading] = useState(false)
  // const [error, setError] = useState()
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, httpDispatch] = useReducer(httpReducer, {loading: false, error: null})

  const addIngredientHandler = ingredient => {
    httpDispatch({type: 'SEND'});
    fetch('https://react-hooks-ingredients-7320e.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      httpDispatch('RESPONSE')
      return response.json()
    }).then(responseData => {
      dispatch({type:'ADD', ingredient: {...ingredient, id: responseData.name}})
    }).catch(error=> {
      httpDispatch({type: 'ERROR', error: error.message})
    })
  }
  const removeIngredientHandler = ingredientId => {
    httpDispatch({type: 'SEND'});
    fetch(`https://react-hooks-ingredients-7320e.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(() => {
      httpDispatch('RESPONSE');
      dispatch({type:'DELETE', id: ingredientId})
    }).catch(error => {
      httpDispatch({type: 'ERROR', error: error.message})
    })
  }

  const filteredIngredientsHandler = useCallback(ingredients => {
    dispatch({type:'SET', ingredients})
  },[])

  const clearError = () => {
    httpDispatch('CLEAR');
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>error</ErrorModal>}
      <IngredientForm addIngredient={addIngredientHandler} loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
