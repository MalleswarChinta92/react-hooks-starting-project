import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props
  const [enteredTitle, setEnteredTitle] = useState('')

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
      onLoadIngredients(loadedIngredients);
    })
  }, [enteredTitle, onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredTitle}
          onChange = {event => setEnteredTitle(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
