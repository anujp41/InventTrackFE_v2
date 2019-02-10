import React from 'react';
import axios from 'axios';
import './UserCount.css';

class UserCount extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      userData: []
    };
  }

  componentDidMount() {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;
    axios
      .get(`${url}/data/user`)
      .then(response => this.setState({ userData: response.data, url }));
    // .then(this.updateState)
    // .then(() => this.setState({ url }))
    // .catch(err => console.log('error ', err));
  }

  handleClick(userId, fruitId) {
    axios
      .put(`${this.state.url}/data/user/`, { userId, fruitId })
      .then(response => console.log('response ', response));
  }

  render() {
    const { userData } = this.state;
    return (
      <>
        <div className="header">User & Fruits</div>
        <div className="col-container">
          {userData.length &&
            userData.map(userInfo => (
              <div className="table-grid" key={userInfo.name}>
                <span key={userInfo.id + userInfo.name}>{userInfo.name}</span>
                {userInfo.Consumer.length ? (
                  userInfo.Consumer.map(fruitInfo => (
                    <React.Fragment
                      key={userInfo.id + userInfo.name + fruitInfo.name}
                    >
                      <span
                        key={userInfo.id + userInfo.name + fruitInfo.id}
                        onClick={() =>
                          this.handleClick(userInfo.id, fruitInfo.id)
                        }
                      >
                        {fruitInfo.name}
                      </span>
                      <span
                        key={
                          userInfo.id +
                          userInfo.name +
                          fruitInfo.id +
                          fruitInfo.counter
                        }
                      >
                        {fruitInfo.UserFruit.counter}
                      </span>
                    </React.Fragment>
                  ))
                ) : (
                  <span
                    className="none"
                    key={userInfo.id + userInfo.name + userInfo.id}
                  >
                    None
                  </span>
                )}
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default UserCount;
