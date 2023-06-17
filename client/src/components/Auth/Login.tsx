import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-toastify";
import { login } from "../../services/auth.service";
import './auth.css';

 interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required()
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema)
  })

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitted(true);
    try {
      const response = await login({ email: data.email, password: data.password });
      if (response?.accessToken) {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsSubmitted(false);
  };

  return (
    <div className='authContainer'>
      <div className='leftImageContainer'>
        <img src='https://i.pinimg.com/564x/2b/e6/31/2be631e3afc5ba303f6315ba8d4c41f3.jpg' alt="left-image" className='leftImage'/>
      </div>
      <div className='authForm'>
        <h1 className="title">
          RepIt <img src='https://pastlenomad.github.io/Pic-RepIt/Logo.png' alt="logo" className='mainLogo'/>
        </h1>
        <form onSubmit={handleSubmit(handleValidSubmit)}>
          <div className='formInput'>
            <label htmlFor='email' className="email">
              Email address
            </label>
            <input
                id="email"
                type="email"
                {...register('email')} //it's coming from line 25 which is a use form
              />
          </div>
          <div className='formInput'>
            <label htmlFor='password' className="Password">
              Password
            </label>
            <input
                id='password'
                type="password"
                {...register('password')}
              />
          </div>
          <div className='formInput'>
            <button type="submit" disabled={!isDirty || !isValid || isSubmitted}>Login</button>
          </div>
        </form>
        <div className="newUser">
          New user?{' '}
          <Link to={'/register'}>Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;


