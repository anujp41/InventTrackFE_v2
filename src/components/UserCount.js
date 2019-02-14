import React from 'react';
import axios from 'axios';
import './UserCount.css';

class UserCount extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      userData: {}
    };
  }

  componentDidMount() {
    axios
      .get(`/data/user`)
      .then(response => {
        console.log('response ', response);
        return response;
      })
      .then(response => this.setState({ userData: response.data }));
  }

  handleClick(userId, fruitId, fruitName) {
    axios.put('/data/user/', { userId, fruitId }).then(response => {
      if (response.data !== 'Gone') {
        this.props.handleMsg(true, `Congrats, you have one more ${fruitName}!`);
      } else {
        this.props.handleMsg(true, `Sorry, ${fruitName} is all gone!`);
      }
    });
  }

  render() {
    const { userData } = this.state;
    const userDataValues = Object.values(userData);
    return (
      <>
        <div className="header">User & Fruits</div>
        <div className="col-container">
          {userDataValues.length &&
            userDataValues.map(userInfo => (
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
                          this.handleClick(
                            userInfo.id,
                            fruitInfo.id,
                            fruitInfo.name
                          )
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
