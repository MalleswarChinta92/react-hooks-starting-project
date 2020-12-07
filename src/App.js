import React from 'react';

import Theme from './components/Theme';
import {ThemeContextProvider} from './context/ThemeContextProvider';

const App = props => {
  return (
    <>
      <ThemeContextProvider>
        <Theme/>
      </ThemeContextProvider>
    </>
  )
//  return <Ingredients />;
};

export default App;
