import React from 'react';
import axios from 'axios';
import './Counter.css';

class Counter extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {
      counter: 0
    };
  }
  componentDidMount() {
    axios
      .get('/data')
      .then(this.updateState)
      .catch(err => console.log('error ', err));
  }
  updateState(response) {
    this.setState({ counter: response.data.apples });
  }
  handleClick(toDo) {
    return toDo === '+'
      ? axios.post('/data').then(this.updateState)
      : axios.delete('/data').then(this.updateState);
  }
  render() {
    return (
      <div className="container">
        <section>
          <button className="decrease" onClick={() => this.handleClick('-')}>
            -
          </button>
          <button className="increase" onClick={() => this.handleClick('+')}>
            +
          </button>
        </section>
        <div className="count">Counter: {this.state.counter}</div>
      </div>
    );
  }
}

export default Counter;
