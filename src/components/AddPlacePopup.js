import React from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = (props) => {
  const [name, setName] = React.useState('');
  const [link, setImage] = React.useState('');

  const handlePlaceName = (e) => {
    setName(e.target.value);
  };
  const handlePlaceImage = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({ name, link });
    setName('');
    setImage('');
  };

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      header='New place'
      buttonText='Create'
      id='popupPlace'
      formId='placeInfo'
      formName='editForm'
    >
      <button
        className='popup__close button'
        type='button'
        aria-label='Close'
        onClick={props.onClose}
      />
      <div className='popup__input-container' id='popupInfoContainer'>
        <input
          className='popup__input popup__input_edit_title'
          id='title-input'
          placeholder='Title'
          name='name'
          type='text'
          minLength='2'
          maxLength='30'
          onChange={handlePlaceName}
          value={name || ''}
          required
        />
        <span className='title-input-error popup__input-error' />
      </div>
      <div className='popup__input-container'>
        <input
          className='popup__input popup__input_edit_image'
          id='image-input'
          placeholder='Image link'
          name='link'
          type='url'
          onChange={handlePlaceImage}
          value={link || ''}
          required
        />
        <span className='image-input-error popup__input-error' />
      </div>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
