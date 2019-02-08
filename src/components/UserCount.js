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
    console.log('this ', this.state);
    return (
      <div className="col-container">
        <div className="header">User & Fruits</div>
      </div>
    );
  }
}

export default UserCount;
