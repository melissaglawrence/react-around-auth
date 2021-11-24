const PopupWithForm = (props) => {
  return (
    <section
      className={`${props.isAuth ? 'auth' : 'popup'}
       ${props.isOpen ? 'popup_opened' : ''} `}
      id={`${props.id}`}
    >
      <div
        className={`${props.isAuth ? 'auth__container' : 'popup__container'}`}
      >
        <form
          className={`${props.isAuth ? 'auth__info' : 'popup__info'}`}
          id={props.formId}
          name={props.formName}
          onSubmit={props.onSubmit}
        >
          <h2 className={`${props.isAuth ? 'auth__title' : 'popup__title'}`}>
            {props.header}
          </h2>
          <>{props.children}</>
          <button
            type='submit'
            className={` button ${props.isAuth ? 'auth__save' : 'popup__save'}`}
            aria-label='save'
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PopupWithForm;
