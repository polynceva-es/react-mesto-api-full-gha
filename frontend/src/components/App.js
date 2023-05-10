import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserPageWithCards from "./pages/UserPageWithCard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/auth";
import api from "../utils/api";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [regedIn, setRegedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoader, setIsLoader] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard ||
    cardToDelete;
  const navigate = useNavigate();

  function tokenCheck() {
    setIsLoader(true);
    const jwt = localStorage.getItem("token");
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          const userEmail = res.data.email;
          setLoggedIn(true);
          setUserEmail(userEmail);
          navigate("/", { replace: true });
        })
        .catch(() => {
          localStorage.removeItem("token");
          setLoggedIn(false);
        })
        .finally(() => setIsLoader(false));
    }
  }
  React.useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      setIsLoader(true);
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then((res) => {
          const [userInfo, initialCards] = res;
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log("Ошибка:" + err);
        })
        .finally(() => setIsLoader(false));
    }
  }, [loggedIn]);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleDeletePopupOpen(card) {
    setCardToDelete(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(undefined);
    setCardToDelete(undefined);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const promise = isLiked
      ? api.deleteLikeCard(card._id)
      : api.setLikeCard(card._id);
    promise
      .then((newCard) =>
        setCards((cards) =>
          cards.map((card) => (card._id === newCard._id ? newCard : card))
        )
      )
      .catch((err) => {
        console.log("Ошибка:" + err);
      });
  }
  function handleCardDelete(card) {
    setIsLoader(true);
    api
      .setDeleteCard(card._id)
      .then(() => setCards((cards) => cards.filter((i) => i._id !== card._id)))
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log("Ошибка:" + err);
      })
      .finally(() => setIsLoader(false));
  }
  React.useEffect(() => {
    function handleCloseEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleCloseEsc);
      return () => {
        document.removeEventListener("keydown", handleCloseEsc);
      };
    }
  }, [isOpen]);
  function handleCloseClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }
  function handleUpdateUser(formValues) {
    setIsLoader(true);
    api
      .setUserInfo(formValues)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка:" + err);
      })
      .finally(() => setIsLoader(false));
  }
  function handleUpdateAvatar(formValue) {
    setIsLoader(true);
    api
      .setUserAvatar(formValue)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка:" + err);
      })
      .finally(() => setIsLoader(false));
  }
  function handleAddPlaceSubmit(formValues) {
    setIsLoader(true);
    api
      .setNewCard(formValues)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка:" + err);
      })
      .finally(() => setIsLoader(false));
  }
  function onSubmitRegister(values) {
    setIsLoader(true);
    register(values)
      .then(() => {
        setRegedIn(true);
      })
      .catch(() => {
        setRegedIn(false); 
      })
      .finally(() => {
        setIsLoader(false); 
        setIsInfoTooltipOpen(true)});
  }
  function onSubmitLogin(values) {
    setIsLoader(true);
    login(values)
      .then(() => {
        setLoggedIn(true);
        setUserEmail(values.email);
        navigate("/", { replace: true })
      })
      .catch((err) => {
        err.then((e) => console.log(e.message));
        setLoggedIn(false)
      })
      .finally(() => {
        setIsLoader(false);
        setIsInfoTooltipOpen(true)})
  }
  function signOut() {
    setLoggedIn(false);
    setIsInfoTooltipOpen(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }
  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={UserPageWithCards}
              loggedIn={loggedIn}
              userEmail={userEmail}
              onClick={signOut}
              currentUser={currentUser}
              cards={cards}
              selectedCard={selectedCard}
              cardToDelete={cardToDelete}
              handleEditProfileClick={handleEditProfileClick}
              handleEditAvatarClick={handleEditAvatarClick}
              handleAddPlaceClick={handleAddPlaceClick}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleDeletePopupOpen={handleDeletePopupOpen}
              handleCloseClickOverlay={handleCloseClickOverlay}
              handleUpdateUser={handleUpdateUser}
              handleUpdateAvatar={handleUpdateAvatar}
              handleAddPlaceSubmit={handleAddPlaceSubmit}
              handleCardDelete={handleCardDelete}
              closeAllPopups={closeAllPopups}
              isLoader={isLoader}
              isEditProfilePopupOpen={isEditProfilePopupOpen}
              isEditAvatarPopupOpen={isEditAvatarPopupOpen}
              isAddPlacePopupOpen={isAddPlacePopupOpen}
              isMenuOpen={isMenuOpen}
              handleMenuOpen={handleMenuOpen}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register
              regedIn={regedIn}
              loggedIn={loggedIn}
              onSubmitRegister={onSubmitRegister}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              handleCloseClickOverlay={handleCloseClickOverlay}
              />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login 
              loggedIn={loggedIn} 
              onSubmitLogin={onSubmitLogin}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
              handleCloseClickOverlay={handleCloseClickOverlay}
              />}
        />
        <Route path="*" element={<div>404 Page Not found</div>} />
      </Routes>
    </>
  );
}

export default App;
