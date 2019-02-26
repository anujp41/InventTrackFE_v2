import React from 'react';
import axios from 'axios';
import './UserCount.css';
import _ from 'lodash';

class UserCount extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.checkFruits = this.checkFruits.bind(this);
    this.state = {
      userData: {},
      allFruits: []
    };
  }

  componentDidMount() {
    this.props.socket
      .on('newCount', updated => {
        if (updated === null) return;
        const { userId, fruitId, counter } = updated;
        const { userData } = this.state;
        const user = userData[userId];
        user.Consumer.forEach(fruit => {
          return fruit.id === fruitId
            ? (fruit.UserFruit.counter = counter)
            : fruit;
        });
        userData[userId] = user;
        this.setState({ userData });
      })
      .on('newUser', newUser => {
        this.setState({ userData: { ...this.state.userData, ...newUser } });
      })
      .on('newFruit', () =>
        this.setState({ userData: this.checkFruits(this.state.userData) })
      );

    axios.get(`/data/user`).then(response => {
      const { data } = response;
      const updatedData = this.checkFruits(data);
      this.setState({ userData: updatedData });
    });
  }

  static getDerivedStateFromProps(nextProps, currState) {
    if (currState.allFruits.length !== nextProps.allFruits.length) {
      return {
        allFruits: nextProps.allFruits
      };
    } else {
      return null;
    }
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

  checkFruits(userDetail) {
    const userInfo = _.cloneDeep(userDetail);
    for (let userKey in userInfo) {
      let itemIdx = 0;
      const userFruitData = userInfo[userKey].Consumer;
      const userFruitCount = userFruitData.length;
      const allFruits = _.cloneDeep(this.props.allFruits);
      allFruits.forEach((fruitData, fruitDataIdx) => {
        if (userFruitCount > 0 && fruitData.id === userFruitData[itemIdx].id) {
          allFruits[fruitDataIdx] = userFruitData[itemIdx];
          itemIdx = Math.min(itemIdx + 1, userFruitCount - 1);
        } else {
          fruitData.UserFruit = { counter: 0 };
        }
      });
      userInfo[userKey].Consumer = allFruits;
    }
    return userInfo;
  }

  render() {
    const { userData, allFruits } = this.state;
    const userDataValues = Object.values(userData);
    return allFruits.length > 0 ? (
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
    ) : null;
  }
}

export default UserCount;
