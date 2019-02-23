import React, { useState } from 'react';
import './Modal.css';
import axios from 'axios';

const Modal = props => {
  let [saveDetail, setSaveDetail] = useState({
    name: '',
    count: '',
    nameError: false,
    countError: false
  });

  const updateState = event => {
    const {
      target: { name: itemName, value }
    } = event;
    setSaveDetail({ ...saveDetail, [itemName]: value });
  };

  const handleSubmit = () => {
    const saveObj = {};
    const { name, count } = saveDetail;
    if (name.length === 0) {
      setSaveDetail({ ...saveDetail, nameError: true });
      setTimeout(() => setSaveDetail({ ...saveDetail, nameError: false }), 750);
      return;
    }
    if (Number.isInteger(count) && count <= 0) {
      setSaveDetail({ ...saveDetail, countError: true });
      setTimeout(
        () => setSaveDetail({ ...saveDetail, countError: false }),
        750
      );
      return;
    }
    props.modalType === 'user'
      ? Object.assign(saveObj, { name })
      : Object.assign(saveObj, { name, count: parseInt(count) });
    console.log('to save', saveObj);
    console.log('the type is ', props.modalType);
    axios.post(`/data/${props.modalType}`, saveObj).then(response => {
      const { msg } = response.data;
      if (msg === 'exists')
        return props.handleMsg(true, `Sorry, ${name} already exists!`);
    });
  };

  const renderUserInput = () => (
    <>
      <input
        className={`fruit ${saveDetail.nameError ? 'info-error' : ''}`}
        type="text"
        name="name"
        placeholder="Name of User"
        value={saveDetail.name}
        onChange={updateState}
      />
      {saveDetail.nameError && (
        <aside className="err-msg">You did not enter a name!</aside>
      )}
    </>
  );

  const renderFruitInput = () => (
    <>
      <input
        className={`fruit ${saveDetail.nameError ? 'info-error' : ''}`}
        type="text"
        name="name"
        placeholder="Name of Fruit"
        value={saveDetail.name}
        onChange={updateState}
      />
      {saveDetail.nameError && (
        <aside className="err-msg">You did not enter a name!</aside>
      )}
      <input
        className={`fruit ${saveDetail.countError ? 'info-error' : ''}`}
        type="number"
        min={0}
        name="count"
        placeholder="Total Count"
        value={saveDetail.count}
        onChange={updateState}
      />
      {saveDetail.countError && (
        <aside className="err-msg">Please enter a number greater than 0!</aside>
      )}
    </>
  );

  return (
    <div className="modal-container">
      <div className="modal">
        <span onClick={() => props.addModal('', false)}>X</span>
        {props.modalType === 'user' ? renderUserInput() : renderFruitInput()}
        <button className="add-button margin-auto" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

/*
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      fruit: '',
      count: ''
    };
  }
  handleChange(event) {
    const {
      target: { name, value }
    } = event;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSave(this.state);
  }
  render() {
    const { fruit, count } = this.state;
    return (
      <div className="modal-container">
        <div className="modal">
          <span onClick={() => this.props.addModal('', false)}>X</span>
          <input
            className="fruit"
            type="text"
            name="fruit"
            placeholder="Fruit Name"
            value={fruit}
            onChange={this.handleChange}
          />
          <input
            className="fruit"
            type="number"
            name="count"
            placeholder="Count"
            value={count !== '' ? count : ''}
            onChange={this.handleChange}
          />
          <button
            className="add-button margin-auto"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
*/

export default Modal;
