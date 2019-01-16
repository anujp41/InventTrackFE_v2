import React, { Component } from 'react';
import { Counter, Wrapper } from './components';
import socketIOClient from 'socket.io-client';

class App extends Component {
  componentDidMount() {
    const socket = socketIOClient('http://192.168.86.209:8000');
    socket.on('news', data => {
      console.log('socket data', data);
      socket.emit('browser', 'Hello from browser my friend!');
    });
  }
  render() {
    return (
      <Wrapper>
        <Counter />
      </Wrapper>
    );
  }
}

export default App;
