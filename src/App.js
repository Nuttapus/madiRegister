import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import Register from './components/register'

class App extends Component {
  
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Register} />
      </Switch>
    );
  }
}

export default App;
