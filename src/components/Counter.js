import React from 'react';
import './Counter.css';
import TotalCount from './TotalCount';
import UserCount from './UserCount';
import Remaining from './Remaining';
import Modal from './Modal';

const Counter = props => {
  const { handleMsg, showModal, modalType, addModal, ...userProps } = props; //extracts handleMsg as not needed in TotalCount

  return (
    <div className="container">
      <TotalCount {...userProps} />
      <UserCount {...props} />
      <Remaining socket={props.socket} />
      {props.showModal && (
        <Modal
          addModal={addModal}
          modalType={modalType}
          handleMsg={handleMsg}
        />
      )}
    </div>
  );
};

export default Counter;
