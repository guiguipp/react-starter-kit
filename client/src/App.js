import React from 'react';
// React Router
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home.js";
// Styles
import '../src/assets/css/App.css';

// Redux 
import { Provider } from 'react-redux'
import store from "./redux/store"

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="*" component={Home} />
      </Switch>
    </Router>
  </Provider>
);

export default App;