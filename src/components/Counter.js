import React, { useState } from 'react';
import './Counter.css';
import TotalCount from './TotalCount';
import UserCount from './UserCount';
import Remaining from './Remaining';
import Modal from './Modal';

const Counter = props => {
  const [fruits, setFruits] = useState([]);
  const { handleMsg, showModal, modalType, addModal, ...userProps } = props; //extracts handleMsg as not needed in TotalCount
  const gotFruits = allFruits => {
    const fruitArr = Object.values(allFruits).map(fruit => ({
      id: fruit.id,
      name: fruit.name
    }));
    setFruits([...fruits, ...fruitArr]);
  };
  return (
    <div className="container">
      <TotalCount {...userProps} gotFruits={gotFruits} />
      <UserCount {...props} allFruits={fruits} />
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
