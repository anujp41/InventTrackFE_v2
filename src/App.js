import React, { Component } from 'react';
import { Counter, Wrapper } from './components';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: null
    };
  }
  componentDidMount() {
    const socket = socketIOClient('http://localhost:8000');
    socket.on('connect', () => {
      this.setState({ socket });
      localStorage.setItem('socketId', socket.id);
    });
    // socket.on('news', data => console.log('data from server', data));
  }
  componentWillUnmount() {
    this.state.socket.disconnect().then(this.setState({ socket: null }));
  }
  render() {
    return (
      <Wrapper>
        {this.state.socket && <Counter socket={this.state.socket} />}
      </Wrapper>
    );
  }
}

export default App;
