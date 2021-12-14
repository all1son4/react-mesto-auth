import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupEditProfile from './PopupEditProfile.js';
import PopupAddCard from './PopupAddCard.js';
import PopupProfileAvatar from './PopupProfileAvatar.js';
import ImagePopup from './ImagePopup.js';
import PopupForDelete from './PopupForDelete.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { CardListContext } from '../contexts/CardListContext.js';
import { Route, Switch } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import InfoToolTip from './InfoToolTip.js';

import successIcon from '../images/complite_icon.svg'
import failIcon from '../images/fail_icon.svg'


function App() {

  const [isEditAvatarPopupOpen, setPopupEditAvatar] = React.useState(false);
  const [isEditProfilePopupOpen, setPopupEditProfile] = React.useState(false);
  const [isAddPlacePopupOpen, setPopupAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [isDeleteSubmitPopupOpen, setPopupDeleteSubmit] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [deleteCard, setDeleteCard] = React.useState(null);

  const [isInfoToolTipOpen, setInfoToolTipOpen] = React.useState(true)


  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([userInfoRes, cardListRes]) => {

        setCurrentUser(userInfoRes);
        setCards(cardListRes);
      })
      .catch(err => alert(`Ошибка полученя данных: ${err}`))
  }, [])

  React.useEffect(() => {
    if (isEditProfilePopupOpen || isEditAvatarPopupOpen || isAddPlacePopupOpen || selectedCard.isOpen || isDeleteSubmitPopupOpen) {
      function handleEsc(event) {
        if (event.key === 'Escape') {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEsc);

      return () => {
        document.removeEventListener('keydown', handleEsc);
      }
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, selectedCard.isOpen, isDeleteSubmitPopupOpen])

  function handleEditAvatarClick() {
    setPopupEditAvatar(true);
  }

  function handleEditProfileClick() {
    setPopupEditProfile(true);
  }

  function handleAddPlaceClick() {
    setPopupAddPlace(true);
  }

  function handleCardClick({ name, link, isOpen }) {
    setSelectedCard({ name, link, isOpen: !isOpen });
  }

  function handleDeleteClick(card) {
    setPopupDeleteSubmit(true);
    setDeleteCard(card)
  }

  function closeAllPopups() {
    setPopupEditAvatar(false);
    setPopupEditProfile(false);
    setPopupAddPlace(false);
    setSelectedCard({ isOpen: false });
    setPopupDeleteSubmit(false)
  }

  function handleOverlayClick(event) {
    if (event.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  function handleUpdateUser(props) {
    api
      .setUserInfoApi(props.name, props.description)
      .then(userInfoRes => {
        setCurrentUser({name: userInfoRes.name, about: userInfoRes.about, avatar: userInfoRes.avatar})
        closeAllPopups();
      })
      .catch(err => alert(`Ошибка полученя данных: ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    api
      .setUserAvatarApi(avatar)
      .then(userInfoRes => {
        setCurrentUser({name: userInfoRes.name, about: userInfoRes.about, avatar: userInfoRes.avatar})
        closeAllPopups();
      })
      .catch(err => alert(`Ошибка отправки данных: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => alert(`Ошибка отправки данных: ${err}`));
    }
    else {
      api
        .unlikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => alert(`Ошибка отправки данных: ${err}`));
    }

  }

  function handleCardDelete() {
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== deleteCard._id ? c : ''));
        closeAllPopups();
      })
      .catch(err => alert(`Ошибка удаления данных: ${err}`));
  }

  function handleAddPlaceSubmit({name, link}) {
    api
      .addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
    .catch(err => alert(`Ошибка отправки данных: ${err}`));
  }

  return (
    <div className="page__container">
      <Switch>
        <Route exact path="/">
          <CurrentUserContext.Provider value={currentUser}>
            <Header />
            <CardListContext.Provider value={cards}>
              <Main onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onDeleteClick={handleDeleteClick}
                    onCardLike={handleCardLike}/>
            </CardListContext.Provider>
            <Footer />
            <PopupProfileAvatar isOpen={isEditAvatarPopupOpen}
                                onClose={closeAllPopups}
                                onOverlayClick={handleOverlayClick}
                                onUpdateAvatar={handleUpdateAvatar}
                                buttonText="Сохранить"/>
            <PopupAddCard isOpen={isAddPlacePopupOpen}
                          onClose={closeAllPopups}
                          onOverlayClick={handleOverlayClick}
                          onAddPlace={handleAddPlaceSubmit}
                          buttonText="Создать"/>
            <PopupEditProfile isOpen={isEditProfilePopupOpen}
                              onOverlayClick={handleOverlayClick}
                              onClose={closeAllPopups}
                              onUpdateUser={handleUpdateUser}
                              buttonText="Сохранить"/>
            <ImagePopup card={selectedCard}
                        onClose={closeAllPopups}
                        onOverlayClick={handleOverlayClick}/>
            <PopupForDelete isOpen={isDeleteSubmitPopupOpen}
                            onClose={closeAllPopups}
                            onOverlayClick={handleOverlayClick}
                            buttonText="Да"
                            onCardDelete={handleCardDelete}/>
          </CurrentUserContext.Provider>
        </Route>
        <Route path="/sign-up">
          <Header />
          <Register />
          <InfoToolTip isOpen={true}
                          onClose={closeAllPopups}
                          onOverlayClick={handleOverlayClick}
                          name="infoToolTip"
                          info="Вы успешно зарегистрировались!"
                          icon={successIcon}/>
        </Route>
        <Route path="/sign-in">
          <Header />
          <Login />
          <InfoToolTip isOpen={true}
                          onClose={closeAllPopups}
                          onOverlayClick={handleOverlayClick}
                          name="infoToolTip"
                          info="Что-то пошло не так! Попробуйте ещё раз."
                          icon={failIcon}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;