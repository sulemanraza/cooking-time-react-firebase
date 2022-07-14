import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirebaseStore } from "../../firebase/config";
// style
import "./Recipe.css";
const Recipe = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unSub = projectFirebaseStore
      .collection("recipes")
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.empty) {
            setIsPending(false);
            setError("recipes not Loading...");
          } else {
            setIsPending(false);
            setData({ id: doc.id, ...doc.data() });
          }
        },
        (error) => {
          setIsPending(false);
          setError(error.message);
        }
      );

    return () => unSub();
  }, [id]);

  return (
    <div className="recipe">
      {error && <div className="error">{error}</div>}
      {isPending && <div className="error">Loading...</div>}
      {data && (
        <>
          <h2>{data.title}</h2>
          <p className="cookingTime"> Take {data.cookingTime} time cook.</p>

          <h4>Ingredients</h4>
          <ul>
            {data.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{data.method}</p>
        </>
      )}
    </div>
  );
};

export default Recipe;
