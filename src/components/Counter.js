import React from 'react';
import './Counter.css';
import TotalCount from './TotalCount';
import UserCount from './UserCount';
import Remaining from './Remaining';
import Modal from './Modal';

const Counter = props => {
  const { handleMsg, ...userProps } = props; //extracts handleMsg as not needed in TotalCount
  return (
    <div className="container">
      <TotalCount {...userProps} />
      <UserCount {...props} />
      <Remaining socket={props.socket} />
      {/* <Modal
        closeModal={this.modalView}
        apiURL={this.state.url}
        handleSave={this.saveData}
      /> */}
    </div>
  );
};

export default Counter;
