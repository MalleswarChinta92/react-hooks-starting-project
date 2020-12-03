import React, {useState, useCallback} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-ingredients-7320e.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {'Content-Type': 'application/json'}
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(previousState=> (
        [...previousState, {...ingredient, id: responseData.name}]
      ))
    })
  }
  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-hooks-ingredients-7320e.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(() => {
      setUserIngredients(previousState=> (
        previousState.filter(ingredient => ingredient.id !== ingredientId)
      ))
    })
  }

  const filteredIngredientsHandler = useCallback(ingredients => {
    setUserIngredients(ingredients)
  },[])

  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
