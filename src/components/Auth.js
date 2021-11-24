const Auth = (props) => {
  return (
    <section className='auth' id={`${props.id}`}>
      <div className='auth__container'>
        <form
          className='auth__info'
          id={props.formId}
          name={props.formName}
          onSubmit={props.onSubmit}
        >
          <h2 className='auth__title'>{props.header}</h2>
          <div className='auth__input-container' id='authInfoContainer'>
            <input
              className='auth__input auth__input_edit_title'
              id='name-input'
              placeholder='Name'
              name='name'
              type='text'
              minLength='2'
              maxLength='40'
              onChange={handleProfileName}
              value={profileName || ''}
              required
            />
            <span className='title-input-error auth__input-error' />
          </div>
          <div className='auth__input-container'>
            <input
              className='auth__input auth__input_edit_about'
              id='passwordInput'
              placeholder=''
              name='about'
              type='text'
              onChange={handleProfileDescription}
              value={profileDescription || ''}
              required
            />
            <span className='auth__input-error' />
          </div>
          <button type='submit' className='auth__save button' aria-label='save'>
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};
