import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Counter, Wrapper, Message } from './components';
import socketIOClient from 'socket.io-client';
import Plus from './components/Plus';

const webHistory = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.msgModal = this.msgModal.bind(this);
    this.addModal = this.addModal.bind(this);
    this.state = {
      socket: null,
      displayMsg: false,
      msgBody: '',
      showModal: false,
      modalType: ''
    };
  }
  componentDidMount() {
    const HOST = window.location.origin
      .replace(/^http/, 'ws')
      .replace(3000, 8000);
    const socket = socketIOClient(HOST);
    socket
      .on('connect', () => {
        this.setState({ socket });
        localStorage.setItem('socketId', socket.id);
      })
      .on('connected', data => console.log(`socket Msg: ${data}`));
  }
  componentWillUnmount() {
    this.state.socket.disconnect().then(this.setState({ socket: null }));
  }
  msgModal(displayMsg, msgBody = '') {
    this.setState({ displayMsg, msgBody });
  }
  addModal(itemToAdd, modalVisible = true) {
    this.setState({ showModal: modalVisible, modalType: itemToAdd });
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
                      showModal={this.state.showModal}
                      modalType={this.state.modalType}
                      addModal={this.addModal}
                    />
                  ) : null
                }
              />
            ))}
          </Switch>
          {this.state.displayMsg && (
            <Message handleMsg={this.msgModal} msgBody={this.state.msgBody} />
          )}
          <Plus addModal={this.addModal} />
        </Wrapper>
      </Router>
    );
  }
}

export default App;
