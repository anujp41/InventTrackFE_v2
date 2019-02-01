import React from 'react';
import axios from 'axios';
import './Counter.css';
import Modal from './Modal';

class Counter extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.updateName = this.updateName.bind(this);
    this.modalView = this.modalView.bind(this);
    this.saveData = this.saveData.bind(this);
    this.state = {
      url: '',
      apiData: [],
      showModal: false
    };
  }
  componentDidMount() {
    this.props.socket.on('updatedCount', data => {
      const socketData = { [data.id]: data };
      const newApiData = { ...this.state.apiData, ...socketData };
      this.setState({ apiData: newApiData });
    });
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
  handleClick(itemId, toDo) {
    axios
      .get(`${this.state.url}/data/${toDo}/${itemId}`, {
        headers: {
          Socket: localStorage.getItem('socketId')
        }
      })
      .then(response => {
        const data = response.data;
        const socketData = { [data.id]: data };
        const newApiData = { ...this.state.apiData, ...socketData };
        this.setState({ apiData: newApiData });
      });
  }
  handleEnter(event, itemId) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.updateName(itemId);
    }
  }
  updateName(itemId) {
    const updatedName = this.refs[`fruit${itemId}`].textContent;
    axios
      .post(`${this.state.url}/data/name/${itemId}`, { name: updatedName })
      .then(this.updateState);
  }
  modalView(showModal) {
    this.setState({ showModal });
  }
  saveData(fruitData) {
    axios.post(`${this.state.url}/data/fruit`, fruitData).then(res => {
      if (res.status === 200) {
        this.updateState(res);
        this.modalView(false);
      }
    });
  }
  render() {
    const apiDataValues = Object.values(this.state.apiData);
    return (
      <div className="container">
        <div className="col-container">
          {apiDataValues.length > 0 &&
            apiDataValues.map(item => (
              <div key={item.name + item.count} className="fruit-container">
                <div className="count">
                  <p
                    ref={'fruit' + item.id}
                    className="inline"
                    contentEditable={true}
                    onKeyDown={event => this.handleEnter(event, item.id)}
                    onBlur={() => this.updateName(item.id)}
                    dangerouslySetInnerHTML={{ __html: item.name }}
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
                  <button
                    className="remove"
                    onClick={() => this.handleClick(item.id, 'remove')}
                  >
                    x
                  </button>
                </section>
              </div>
            ))}
        </div>
        <button
          className="add-button center"
          onClick={() => this.modalView(true)}
        >
          Add Item
        </button>
        {this.state.showModal && (
          <Modal
            closeModal={this.modalView}
            apiURL={this.state.url}
            handleSave={this.saveData}
          />
        )}
      </div>
    );
  }
}

export default Counter;
