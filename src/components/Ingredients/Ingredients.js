import React, {useState, useEffect} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])

  useEffect(() => {
    fetch('https://react-hooks-ingredients-7320e.firebaseio.com/ingredients.json').then(response => {
      return response.json()
    }).then(responseData => {
      const loadedIngredients = []
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        })
      }
      setUserIngredients(loadedIngredients)
    })
  }, [])

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
