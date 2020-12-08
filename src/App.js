import React from 'react';

import Theme from './components/Theme';
import {ThemeContextProvider} from './context/ThemeContextProvider';
import Memo from './components/Memo';

const App = props => {
  return (
    // <>
    //   <ThemeContextProvider>
    //     <Theme/>
    //   </ThemeContextProvider>
    // </>
    <Memo/>
  )
//  return <Ingredients />;
};

export default App;
