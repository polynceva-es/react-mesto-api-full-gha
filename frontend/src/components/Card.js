import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card (props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i=> i._id === currentUser._id);
    const CardLikeButtonClassName = (`button button_type_like ${isLiked && 'button_active'}`);

    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return(
    <article className="card">
        {isOwn && <button 
                    className="button button_type_delete" 
                    type="button" 
                    aria-label="Удалить карточку"
                    onClick={handleDeleteClick}
                  />}
        <img className="card__image" src={props.card.link} onClick={handleClick} alt="Фото места"/>
        <div className="card__item">
            <h2 className="card__caption">{props.card.name}</h2>
            <div className="card__like">
                <button 
                    className={CardLikeButtonClassName} 
                    type="button" 
                    aria-label="Поставить лайк"
                    onClick={handleLikeClick}
                />
                <p className="card__like_num">{props.card.likes.length}</p>
            </div>
        </div>
    </article>
    )
}

export default Card;

