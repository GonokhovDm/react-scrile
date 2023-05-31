import React, { useState } from 'react';
import Toggle from 'react-toggle';

import closeBtn from '../../svg/xmark-solid.svg'

import './modal.scss';
import  "react-toggle/style.css"

function Modal({modalActive, setModalActive}) {

  const [selectValue, setSelectValue] = useState(0);
  const [is100checked, setIs100checked] = useState(false);
  const [is200checked, setIs200checked] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errorFirstName, setErrorFirstName] = useState(null);
  const [errorLastName, setErrorLastName] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorSelect, setErrorSelect] = useState(null);

  const selectHandle = (event) => {
    setSelectValue(Number(event.target.value));
  }

  const is100handle = () => {
    setIs100checked(!is100checked)
  }

  const is200handle = () => {
    setIs200checked(!is200checked)
  }

  const getPrice = () => {
    if ((is100checked) && (is200checked)) {
      return selectValue + 300
    }
    if (is100checked) {
      return selectValue + 100
    }
    if (is200checked) {
      return selectValue + 200
    } else {
      return selectValue
    }
  }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChangeFirstName = event => {
    setFirstName(event.target.value);
  }

  const handleChangeLastName = event => {
    setLastName(event.target.value);
  }

  const handleChangeEmail = event => {
    setEmail(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    setErrorEmail(null);
    setErrorFirstName(null);
    setErrorLastName(null);
    setErrorSelect(null);

    if (isValidEmail(email)) {
      console.log('The email is valid');
    } else {
      setErrorEmail('Please enter a valid email adress');
    }

    if (!firstName) {
      setErrorFirstName('Please fill in FirstName');
    }

    if (!lastName) {
      setErrorLastName('Please fill in LastName');
    }

    if (!selectValue) {
      setErrorSelect('Please select product type');
    }

    if ((!firstName) || (!lastName) || (!email) || (!selectValue)) {
      
      console.log("Fill valid value at all fields");
    } else {
      console.log(email);
      console.log(firstName);
      console.log(lastName);
      console.log(selectValue);
    }
  };

  // ========================================================================================= //

  return (
    <div className={modalActive ? "modal active" : "modal"}>
      <div className={modalActive ? "modal__content active" : "modal__content"}>
        <div className="close-modal" onClick={() => setModalActive(false)}>
          <img src={closeBtn} alt="close" />
        </div>
        <h2>Title form</h2>
        <form action="POST" onSubmit={handleSubmit}>
          <ul>
            <li>
              <label htmlFor="first-name">
                <input className={errorFirstName ? 'error' : ''} id='first-name' type="text" onChange={handleChangeFirstName} placeholder="&nbsp;" autoComplete='else' />
                <span className="label">First Name *</span>
              </label>
            </li>
            {errorFirstName && <h4 style={{color: '#d44a4a', fontSize: '13px', fontWeight:'300', marginTop: '3px'}}>{errorFirstName}</h4>}
            <li>
              <label htmlFor="last-name">
                <input className={errorLastName ? 'error' : ''} id='last-name' type="text" onChange={handleChangeLastName} placeholder='&nbsp;' autoComplete='else' />
                <span className="label">Last Name *</span>
              </label>
            </li>
            {errorLastName && <h4 style={{color: '#d44a4a', fontSize: '13px', fontWeight:'300', marginTop: '3px'}}>{errorLastName}</h4>}
            <li>
              <label htmlFor="email">
                <input className={errorEmail ? 'error' : ''} id='email' type="text" value={email} onChange={handleChangeEmail} placeholder='&nbsp;' autoComplete='else'  />
                <span className="label">user@gmail.com *</span>
              </label>
            </li>
            {errorEmail && <h4 style={{color: '#d44a4a', fontSize: '13px', fontWeight:'300', marginTop: '3px'}}>{errorEmail}</h4>}
          </ul>
          <div className="select-type">
            <h5>Product type *</h5>
            <div className="select-area">
              <select className={errorSelect ? 'error' : ''} value={selectValue} onChange={selectHandle} placeholder='&nbsp;'>
                <option disabled value="0" selected>Select product type</option>
                <option value="50">Product $50</option>
                <option value="100">Product $100</option>
                <option value="300">Product $300</option>
              </select>
              {errorSelect && <h4 style={{color: '#d44a4a', fontSize: '13px', fontWeight:'300', marginTop: '3px'}}>{errorSelect}</h4>}
            </div>
          </div>
          <div className="select-checkbox">
            <h5>Additional feature for $100</h5>
            <label>
              <Toggle
                defaultChecked={false}
                icons={false}
                onChange={is100handle} />
            </label>
          </div>
          <div className="select-checkbox">
            <h5>Additional feature for $200</h5>
            <label>
              <Toggle
                defaultChecked={false}
                icons={false}
                onChange={is200handle} />
            </label>
          </div>
          <div className="textarea">
            <label htmlFor="textarea">
              <textarea name="message" id='textarea' rows={3} placeholder='&nbsp;'></textarea>
              <span className="label">Type your comment</span>
            </label>
          </div>
          <div className="price">
            <h5>Total price:</h5>
            <h5>{getPrice()}$</h5>
          </div>
          <div className="submit-button">
            <input type="submit" value="Send form" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
