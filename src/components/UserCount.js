import React from 'react';
import axios from 'axios';
import './UserCount.css';

class UserCount extends React.Component {
  constructor() {
    super();
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
      .then(response => this.setState({ userData: response.data }));
    // .then(this.updateState)
    // .then(() => this.setState({ url }))
    // .catch(err => console.log('error ', err));
  }
  render() {
    const { userData } = this.state;
    userData.length && console.log(userData);
    userData[0] &&
      console.log('here ', userData[0] && userData[0].Consumer.length);
    return (
      <>
        <div className="header">User & Fruits</div>
        <div className="col-container">
          {userData.length &&
            userData.map(userInfo => {
              console.log('userInfo ', userInfo.Consumer);
              return (
                <div className="table-grid">
                  <span key={userInfo.id + userInfo.name}>{userInfo.name}</span>
                  {userInfo.Consumer.length ? (
                    userInfo.Consumer.map(fruitInfo => (
                      <>
                        <span>{fruitInfo.name}</span>
                        <span>{fruitInfo.UserFruit.counter}</span>
                      </>
                    ))
                  ) : (
                    <span className="none">None</span>
                  )}
                </div>
              );
            })}
        </div>
      </>
    );
  }
}

export default UserCount;
