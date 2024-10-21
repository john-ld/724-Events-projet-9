import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
    <div
      data-testid="card-testid"
      className={`EventCard${small ? " EventCard--small" : ""}`}
      {...props}
    >
      <div className="EventCard__imageContainer">
        <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
        <div className="EventCard__label">{label}</div>
      </div>
      <div className="EventCard__descriptionContainer">
        <div className="EventCard__title">{title}</div>
        <div className="EventCard__month">{getMonth(date)}</div>
      </div>
    </div>
  );

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageSrc: "default-image-url.jpg", // Valeur par défaut pour l'URL de l'image si aucune image n'est passée au composant
  imageAlt: "image", // Texte alternatif par défaut pour l'image si aucun texte n'est fourni
  small: false, // Par défaut, la carte ne sera pas en version "small" (taille normale)
  title: "" // Si aucun titre n'est passé, la carte affichera un titre vide (aucun texte visible)
};

export default EventCard;
