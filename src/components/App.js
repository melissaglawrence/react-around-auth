import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const [message, setMessage] = useState('');
  const history = useHistory();

  ///POPUP FUNCTIONALITY
  const handleAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImageOpen(true);
  };
  const closeAllPopups = () => {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
    setIsTooltipOpen(false);
  };

  //GET INITIAL DATA
  useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res.map((card) => card));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //CARD FUNCTIONALITY
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (data) => {
    api
      .createNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //USER FUNCTIONALITY
  const handleUpdateUser = ({ name, about }) => {
    api
      .updateUserInfo(name, about)
      .then((user) => {
        setCurrentUser(user);
        setIsEditProfilePopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .userAvatar(avatar)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        setIsEditAvatarPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //TOKENCHECK
  const jwt = localStorage.getItem('jwt');
  const tokenCheck = useCallback(() => {
    if (jwt) {
      auth.getUser(jwt).then((data) => {
        if (data) {
          setUserData(data);
          setLogin(true);
          history.push('/');
        }
      });
    }
    return;
  }, [history, jwt]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  //LOGIN FUNCTIONALITY
  const handleLogin = (data) => {
    auth.signIn(data).then((data) => {
      if (!data) {
        return setMessage('the user with the specified email not found');
      }
      if (data) {
        setMessage('');
        setUserData(data);
        setLogin(true);
        history.push('/');
        return;
      }
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/signin');
  };

  //REGISTRATION FUNCTIONALITY
  const handleRegister = (data) => {
    auth
      .signUp(data)
      .then((res) => {
        if (res.data) {
          setMessage('');
          history.push('/signin');
          setIsTooltipOpen(true);
          setIsSignUpSuccess(true);
          return;
        } else {
          setIsTooltipOpen(true);
          setIsSignUpSuccess(false);
          return setMessage('An error occured');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Switch>
      <Route path='/signin'>
        <Login onLogin={handleLogin} message={message} />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isSignUpSuccess}
        />
      </Route>
      <Route path='/signup'>
        <Register onRegister={handleRegister} message={message} />
        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccessful={isSignUpSuccess}
        />
      </Route>
      <ProtectedRoute exact path='/' login={login}>
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            link={'/signin'}
            message='Sign Out'
            login={login}
            signOut={handleSignOut}
            userEmail={userData}
          />
          <Main
            cards={cards}
            onEditAvatarClick={handleAvatarClick}
            onEditProfileClick={handleProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImageOpen}
            onClose={closeAllPopups}
          />
          <Footer />
        </CurrentUserContext.Provider>
      </ProtectedRoute>
      <Route exact path='/'>
        {login ? <Redirect to='/' /> : <Redirect to='/signin' />}
      </Route>
    </Switch>
  );
};

export default App;
