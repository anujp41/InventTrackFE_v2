import React from 'react';
import axios from 'axios';
import './Counter.css';

class Counter extends React.Component {
  constructor() {
    super();
    // this.fruitNameRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.htmlItem = this.htmlItem.bind(this);
    this.state = {
      counter: 0,
      url: '',
      editMe: true,
      apiData: []
    };
  }
  componentDidMount() {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;
    axios
      .get(`${url}/data`)
      .then(this.updateState)
      .then(() => this.setState({ url }))
      .catch(err => console.log('error ', err));
  }
  updateState(response) {
    this.setState({ apiData: response.data });
  }
  handleChange(id) {
    console.log('updated name: ', this.refs[`fruit${id}`].textContent);
  }
  handleClick(itemId, toDo) {
    axios
      .get(`${this.state.url}/data/${toDo}/${itemId}`)
      .then(this.updateState);
  }
  handleEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      console.log('stopped new line! ', this.state.apiData);
    }
    // console.log(event.keyCode);
  }
  htmlItem(item) {
    return { __html: item };
  }
  render() {
    const { apiData } = this.state;
    console.log(apiData);
    return (
      <div className="container">
        {apiData.length > 0 &&
          apiData.map(item => (
            <div key={item.fruit} className="fruit-container">
              <div className="count">
                <p
                  ref={'fruit' + item.id}
                  className="inline"
                  contentEditable={true}
                  onKeyDown={this.handleEnter}
                  onInput={() => this.handleChange(item.id)}
                  dangerouslySetInnerHTML={{ __html: item.fruit }}
                />{' '}
                : <p className="inline">{item.count}</p>
              </div>
              <section>
                <button
                  className="decrease"
                  onClick={() => this.handleClick(item.id, 'subtract')}
                >
                  -
                </button>
                <button
                  className="increase"
                  onClick={() => this.handleClick(item.id, 'add')}
                >
                  +
                </button>
              </section>
            </div>
          ))}
      </div>
    );
  }
}

export default Counter;
