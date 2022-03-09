import React from 'react';
import { Provider } from 'react-redux';
import Home from './components/Home/Home';
import store from './redux/store';

const App = () => {
  return (
      <Provider store={store}>
        <Home />
      </Provider>
  );
};

export default App;