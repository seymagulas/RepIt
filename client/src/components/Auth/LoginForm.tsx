import React, { useState } from 'react';
import './loginForm.css';

const LoginForm = ({ onLogin, onCreateAccountClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Login submitted:', email, password);

    setEmail('');
    setPassword('');

    // Call the onLogin callback passed from the parent component
    onLogin();
  };

  const handleCreateAccountClick = (e) => {
    e.preventDefault();

    // Call the onCreateAccountClick callback passed from the parent component
    onCreateAccountClick();
  };

  return (
    <div className='loginForm'>
      <h1 className="title">
        RepIt <img src='https://pastlenomad.github.io/Pic-RepIt/Logo.png' alt="logo" className='mainLogo'/>
      </h1>
      <form onSubmit={handleSubmit}>
        <label className="email">
          Email address
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
        </label>
        <br />
        <label className="Password">
          Password
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <div className="newUser">
        New user?{' '}
        <a href="#" onClick={handleCreateAccountClick}>
          Create an account
        </a>
      </div>
    </div>
  );
};

export default LoginForm;


