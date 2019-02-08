import React from 'react';
import axios from 'axios';
import './UserCount.css';

class UserCount extends React.Component {
  componentDidMount() {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV_URL
        : process.env.REACT_APP_PROD_URL;
    axios
      .get(`${url}/data/user`)
      // .then(data => console.log('response data', data));
    // .then(this.updateState)
    // .then(() => this.setState({ url }))
    // .catch(err => console.log('error ', err));
  }
  render() {
    return (
      <div className="col-container user-count">
        <h3>All users go here</h3>
      </div>
    );
  }
}

export default UserCount;
