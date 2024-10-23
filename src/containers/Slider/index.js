import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext"; // Importation du contexte DataContext
import { getMonth } from "../../helpers/Date"; // Importation de la fonction getMonth pour formater la date
import "./style.scss"; // Importation des styles

const Slider = () => {
  const { data } = useData(); // Récupération des données à partir du contexte
  const [index, setIndex] = useState(0); // État pour suivre l'index de l'image affichée

  // Trier les événements par date décroissante (du plus ancien au plus récent)
  const byDateDesc = [...(data?.focus || [])].sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1
  );

  const dataLength = byDateDesc.length; // Stocke la longueur du tableau des événements

  // Utiliser un intervalle pour changer d'image automatiquement toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex < dataLength - 1 ? prevIndex + 1 : 0 // Si l'index atteint la dernière image, il revient à 0
      );
    }, 5000); // Changer l'image toutes les 5 secondes

    // Nettoyage de l'intervalle pour éviter les fuites de mémoire lors du démontage du composant
    return () => clearInterval(interval);
  }, [dataLength]); // Dépend de la longueur du tableau d'événements

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={`event-${event.id}`} // Utilisation de l'ID unique pour chaque carte d'événement
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide" // Affiche ou cache la carte selon l'index
            }`}
        >
          <img src={event.cover} alt={event.title} /> {/* Image de l'événement */}
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3> {/* Titre de l'événement */}
              <p>{event.description}</p> {/* Description de l'événement */}
              <div>{getMonth(new Date(event.date))}</div> {/* Affichage du mois de l'événement */}
            </div>
          </div>
        </div>
      ))}

      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`pagination-${event.id}`} // Clé unique pour chaque bouton de pagination
              type="radio"
              name="radio-button"
              checked={index === radioIdx} // Vérifie si le bouton correspond à l'image actuelle
              readOnly // Empêche la modification manuelle du bouton
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
