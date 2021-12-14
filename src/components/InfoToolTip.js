import React from "react";

function InfoToolTip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onOverlayClick}>
      <div className="popup__container popup__container_info">
        <img src={props.icon} alt="инфоиконка" className="popup__icon"/>
        <h2 className="popup__info">{props.info}</h2>
      <button type="button" className="popup__close-button" onClick={props.onClose}></button>
      </div>
    </div>
  )
}

export default InfoToolTip