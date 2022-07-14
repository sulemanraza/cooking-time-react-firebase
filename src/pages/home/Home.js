import { useEffect, useState } from "react";
import RecipeList from "../../components/RecipeList";
import { projectFirebaseStore } from "../../firebase/config";

// style
import "./Home.css";

const Home = () => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);
    // get date from firebase
    const unSub = projectFirebaseStore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
          setError("recipes not Loading...");
        } else {
          setIsPending(false);
          const results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
        }
      },
      (err) => {
        setIsPending(false);
        setError(err.message);
      }
    );

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="home">
      {error && <div className="error">{error}</div>}
      {isPending && <div>Loading....</div>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};

export default Home;
