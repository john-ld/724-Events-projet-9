import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  // Utilisation de useMemo pour afficher le dernier évènement last
  // Cette fonction ne sera réévaluée que si 'data' change.
  const last = useMemo(() => {
    if (!data) return null;
    // Utilise reduce pour parcourir les événements et trouver le plus récent.
    return data.events?.reduce((mostRecent, event) => {
      if (!mostRecent) return event;
      return new Date(mostRecent.date) > new Date(event.date) // Compare les dates pour sélectionner l'événement le plus récent
        ? mostRecent
        : event;
    });
  }, [data]); // 'last' sera recalculé uniquement lorsque 'data' change
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider // Fournit les données 'data', les erreurs 'error' et le dernier événement 'last' via le contexte
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last, // ajout de la value "last".
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
