import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext"; // Importation du contexte DataContext
import { getMonth } from "../../helpers/Date"; // Importation de la fonction getMonth pour formater la date
import "./style.scss"; // Importation des styles

const Slider = () => {
  const { data } = useData(); // Récupération des données à partir du contexte DataContext
  const [index, setIndex] = useState(0); // Déclaration de l'état 'index' pour suivre l'index de l'image affichée actuellement

// Tri des événements par date du plus ancien au plus récent
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? 1 : -1 // Si evtA est plus récent que evtB, le tri les place dans l'ordre chronologique
  );
// Fonction pour passer à la carte suivante toutes les 5 secondes
  const nextCard = () => { 
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),// Incrémente l'index jusqu'à atteindre la dernière carte, puis revient à 0
      5000 // Change la carte toutes les 5 secondes
    );
  };
  // Utilisation de useEffect pour exécuter la fonction nextCard à chaque fois que 'byDateDesc' change
  useEffect(() => {
    if (byDateDesc) {
      nextCard();// Si 'byDateDesc' est défini, passe à la carte suivante
    }
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => ( // Parcourt chaque événement trié pour l'afficher dans le slider
        <div
        // correction key={`${event.id}`} event n'utilise pas d'id
        key={event.title}> 
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"// Affiche la carte si l'index actuel correspond à l'index de la carte, sinon la cache
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.title} // Utilisation du titre comme clé pour chaque élément de pagination
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // correction de checked={idx === radioIdx} correction idx => index 
                  readOnly // Empêche la modification manuelle des boutons radio
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;