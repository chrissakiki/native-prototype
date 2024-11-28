import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store/store';
import NavigationStack from './src/navigation/NavigationStack';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationStack />
    </Provider>
  );
};

export default App;
