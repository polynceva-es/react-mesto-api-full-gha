import React from "react";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import EditProfilePopup from "../EditProfilePopup";
import EditAvatarPopup from "../EditAvatarPopup";
import AddPlacePopup from "../AddPlacePopup";
import ImagePopup from "../ImagePopup";
import DeletePopup from "../DeletePopup";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Loader from "../Loader";

function UserPageWithCards (props) {
  return (
    <CurrentUserContext.Provider value={props.currentUser}>
        <Header 
          to="sign-in"
          text="Выйти"
          email={props.userEmail}
          onClick={props.onClick}
          loggedIn={props.loggedIn}
          isMenuOpen={props.isMenuOpen}
          handleMenuOpen={props.handleMenuOpen}
        />
      <Main
        cards = {props.cards}
        onEditProfile={props.handleEditProfileClick}
        onEditAvatar={props.handleEditAvatarClick}
        onAddPlace={props.handleAddPlaceClick}
        onCardClick={props.handleCardClick}
        onCardLike={props.handleCardLike}
        onCardDelete={props.handleDeletePopupOpen}
      />
      <Footer />
      <EditProfilePopup
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.closeAllPopups}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
        onUpdateUser={props.handleUpdateUser}
      />
      <EditAvatarPopup
        isOpen={props.isEditAvatarPopupOpen}      
        onClose={props.closeAllPopups}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
        onUpdateAvatar={props.handleUpdateAvatar}
      />
      <AddPlacePopup
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.closeAllPopups}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
        onAddPlace={props.handleAddPlaceSubmit}
      />
      <ImagePopup 
        card={props.selectedCard} 
        onClose={props.closeAllPopups}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
      />
      {/* Вы уверены? */}
      <DeletePopup 
        card={props.cardToDelete}
        onClose={props.closeAllPopups}
        onSubmit={props.handleCardDelete}
        handleCloseClickOverlay={props.handleCloseClickOverlay}
      />

      <Loader
        isLoader={props.isLoader}
      />
    </CurrentUserContext.Provider>
  );
}

export default UserPageWithCards;