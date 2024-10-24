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
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

EventCard.defaultProps = {
  imageSrc: "default-image-url.jpg", // valeur par défaut pour l'URL de l'image si aucune n'est fournie par l'utilisateur
  imageAlt: "image", // valeur par défaut pour le texte alternatif de l'image attribut alt si aucun n'est fourni.
  small: false, // valeur par défaut de la propriété "small" à false 
  title: ""    // titre vide par défaut Si aucun titre n'est fourni il n'y aura pas de texte
};

export default EventCard;