import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import Header from './Header';

const Login = ({ onLogin, handleChange, ...props }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Header link={'/signup'} message='Sign Up' login={false} />
      <PopupWithForm
        isAuth={true}
        onSubmit={handleSubmit}
        header='Log In'
        buttonText='Log In'
        id='signIn'
        formId='signInForm'
        formName='signIn'
      >
        <div className='auth__input-Container'>
          <input
            className='auth__input auth__input_email'
            id='signInEmailInput'
            placeholder='Email'
            name='email'
            type='text'
            onChange={handleEmail}
            value={email || ''}
            required
          />
          <span className='auth__input-error'>{props.message}</span>
        </div>
        <div className='auth__input-container'>
          <input
            className='auth__input'
            id='signInPasswordInput'
            placeholder='Password'
            name='password'
            type='password'
            onChange={handlePassword}
            value={password || ''}
            required
          />
          <span className='auth__input-error'>{props.message}</span>
        </div>
      </PopupWithForm>
      <div className='redirect'>
        <p>Not a member yet? </p>
        <Link to='/signUp' className='button redirect__button'>
          Sign up here!
        </Link>
      </div>
    </>
  );
};

export default Login;
