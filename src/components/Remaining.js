import React, { useState, useEffect } from 'react';
import './Remaining.css';

const Remaining = props => {
  const [remainCount, setRemainCount] = useState({});
  const [dataReceived, setDataReceived] = useState(false);
  const [randItem, setRandItem] = useState(Math.random());
  useEffect(() => {
    !dataReceived && props.socket.emit('getData', 'fruitData');
    props.socket.on('remainder', remainder => {
      setDataReceived(true); //once dataReceived set to true in state, no further requests; otherwise continuous requests sent as state continuously being updated
      setRemainCount(remainder);
    });
    props.socket.on('updateThis', () =>
      props.socket.emit('getData', 'fruitData')
    );
  });
  const remainingFruitData = Object.values(remainCount);
  console.log('doing render');
  return (
    <>
      <div className="header">Remainder fruits</div>
      <div className="col-container remainder">
        {remainingFruitData.length > 0 &&
          remainingFruitData.map(fruitData => (
            <div className="fruit-remain" key={fruitData.name}>
              <span>{fruitData.name}</span> : <span>{fruitData.remainder}</span>
            </div>
          ))}
      </div>
    </>
  );
};

export default Remaining;
