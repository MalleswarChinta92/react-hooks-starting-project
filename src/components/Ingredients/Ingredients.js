import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])
  const addIngredientHandler = ingredient => {
    setUserIngredients(previousState=> (
      [...previousState, {...ingredient, id: Math.random().toString()}]
    ))
  }
  const removeIngredientHandler = ingredientId => {
    setUserIngredients(previousState=> (
      previousState.filter(ingredient => ingredient.id !== ingredientId)
    ))
  }
  return (
    <div className="App">
      <IngredientForm addIngredient={addIngredientHandler}/>

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
