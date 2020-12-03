import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState()

  const addIngredientHandler = ingredient => {
    setLoading(true)
    fetch('https://react-hooks-ingredients-7320e.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      setLoading(false)
      return response.json()
    }).then(responseData => {
      setUserIngredients(previousState=> (
        [...previousState, {...ingredient, id: responseData.name}]
      ))
    }).catch(error=> {
      setError(error.message)
    })
  }
  const removeIngredientHandler = ingredientId => {
    setLoading(true)
    fetch(`https://react-hooks-ingredients-7320e.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(() => {
      setLoading(false);
      setUserIngredients(previousState=> (
        previousState.filter(ingredient => ingredient.id !== ingredientId)
      ))
    }).catch(error => {
      setError(error.message)
    })
  }

  const filteredIngredientsHandler = useCallback(ingredients => {
    setUserIngredients(ingredients)
  },[])

  const clearError = () => {
    setError(null)
    setLoading(false)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>error</ErrorModal>}
      <IngredientForm addIngredient={addIngredientHandler} loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
