import React, { useState } from 'react';
import './createAccountForm.css';

const CreateAccountForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform password validation
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Clear form inputs
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="createAccountForm">
      <h1 className="title">
        RepIt <img src='https://pastlenomad.github.io/Pic-RepIt/Logo.png' alt="logo" className='mainLogo'/>
      </h1>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email Address</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <br />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
