import React from 'react';
import axios from 'axios';
import './TotalCount.css';

class TotalCount extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateApiData = this.updateApiData.bind(this);
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

  // socketListeners = [
  //   {
  //     eventName: 'updatedCount',
  //     fn: async data => {},
  //   }
  // ]

  componentDidMount() {
    //mounted to component to listen for socket updates on total fruit counter
    // this.socketListeners.forEach(listener => this.props.socket.on(listner.eventName, listener.fn));
    this.props.socket
      .on('updatedCount', async data => {
        this.updateApiData(data.response);
        const { socketId } = data;
        socketId === (await localStorage.getItem('socketId'))
          ? console.log('you updated!')
          : console.log('someone else updated!');
      })
      .on('fruit-delete', id => {
        const { apiData } = this.state;
        delete apiData[id];
        this.updateState({ data: apiData });
      });
    this.props.socket.on(function(event) {
      console.log('event is ', event);
    });
    // will call data for most recent fruit counter data
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;
    axios
      .get(`${url}/data/fruit`)
      .then(this.updateState)
      .then(() => this.setState({ url }))
      .catch(err => console.log('error ', err));
  }
  updateState(response) {
    this.setState({ apiData: response.data });
  }
  updateApiData(updatedData) {
    const newData = { [updatedData.id]: updatedData };
    const newApiData = { ...this.state.apiData, ...newData };
    this.setState({ apiData: newApiData });
  }
  handleClick(itemId, toDo) {
    axios.get(`${this.state.url}/data/fruit/${toDo}/${itemId}`, {
      headers: {
        Socket: localStorage.getItem('socketId')
      }
    });
    // .then(response => console.log('response complete ', response));
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
      .post(`${this.state.url}/data/fruit/name/${itemId}`, {
        name: updatedName
      })
      .then(this.updateState);
  }
  modalView(showModal) {
    this.setState({ showModal });
  }
  saveData(fruitData) {
    axios.post(`${this.state.url}/data/fruit/fruit`, fruitData).then(res => {
      if (res.status === 200) {
        this.updateState(res);
        this.modalView(false);
      }
    });
  }
  render() {
    const apiDataValues = Object.values(this.state.apiData);
    return (
      <React.Fragment>
        <div className="header">All Fruits</div>
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
          {/* <button
          className="add-button center"
          onClick={() => this.modalView(true)}
        >
          Add Item
        </button> */}
          {/* {this.state.showModal && (
          <Modal
            closeModal={this.modalView}
            apiURL={this.state.url}
            handleSave={this.saveData}
          />
        )} */}
        </div>
      </React.Fragment>
    );
  }
}

export default TotalCount;
