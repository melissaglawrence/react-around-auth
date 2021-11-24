import React from 'react';
import { Link } from 'react-router-dom';
import PopupWithForm from './PopupWithForm';
import Header from './Header';

const Register = ({ handleChange, onRegister, ...props }) => {
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

    onRegister({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <Header link='/signin' message='Log In' login={false} />
      <PopupWithForm
        isAuth={true}
        onSubmit={handleSubmit}
        header='Sign Up'
        buttonText='Sign Up'
        id='signUp'
        formId='signUpForm'
        formName='signUp'
      >
        <div className='auth__input-Container'>
          <input
            className='auth__input auth__input_email'
            id='signUpEmailInput'
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
            id='signUpPasswordInput'
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
        <p>Already a member? </p>
        <Link to='/signIn' className='button redirect__button'>
          Log in here!
        </Link>
      </div>
    </>
  );
};

export default Register;
