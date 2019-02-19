import React, { Component } from 'react';
import { Route , Switch } from 'react-router-dom';
import Register from './components/register'
import List from './components/list'

class App extends Component {
  
  render() {
    return (
      <Switch>
          <Route exact path="/" component={Register} />
          <Route exact path="/listdata" component={List} />
      </Switch>
    );
  }
}

export default App;
