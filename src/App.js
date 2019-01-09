import React, { Component } from 'react';
import { Counter, Wrapper } from './components';

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Counter />
      </Wrapper>
    );
  }
}

export default App;
