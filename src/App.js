import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Counter, Wrapper, Message } from './components';
import socketIOClient from 'socket.io-client';

const webHistory = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      socket: null,
      displayMsg: false
    };
  }
  componentDidMount() {
    const socket = socketIOClient('http://localhost:8000');
    socket.on('connect', () => {
      this.setState({ socket });
      localStorage.setItem('socketId', socket.id);
    });
  }
  componentWillUnmount() {
    this.state.socket.disconnect().then(this.setState({ socket: null }));
  }
  render() {
    return (
      <Router history={webHistory}>
        <Wrapper>
          <Switch>
            {['/', '/counter'].map(url => (
              <Route
                key={url}
                path={url}
                render={props =>
                  this.state.socket ? (
                    <Counter
                      {...props}
                      socket={this.state.socket}
                      cookies={this.props.cookies}
                    />
                  ) : null
                }
              />
            ))}
          </Switch>
          {this.state.displayMsg && <Message />}
        </Wrapper>
      </Router>
    );
  }
}

export default App;
