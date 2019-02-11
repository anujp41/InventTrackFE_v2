import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Counter, Wrapper, Message } from './components';
import socketIOClient from 'socket.io-client';

const webHistory = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.msgModal = this.msgModal.bind(this);
    this.state = {
      socket: null,
      displayMsg: false,
      msgBody: ''
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
  msgModal(displayMsg, msgBody = '') {
    this.setState({ displayMsg, msgBody });
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
                      handleMsg={this.msgModal}
                    />
                  ) : null
                }
              />
            ))}
          </Switch>
          {this.state.displayMsg && (
            <Message handleMsg={this.msgModal} msgBody={this.state.msgBody} />
          )}
        </Wrapper>
      </Router>
    );
  }
}

export default App;
