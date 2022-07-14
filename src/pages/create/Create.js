// style
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import { projectFirebaseStore } from "../../firebase/config";

function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredients, setNewIngredients] = useState("");
  const [Ingredients, setIngredients] = useState([]);

  const ingredientsInput = useRef(null);
  const navigate = useNavigate();

  const handelAdd = (e) => {
    e.preventDefault();
    const ing = newIngredients.trim();
    if (ing && !Ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredients("");
    ingredientsInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      method,
      ingredients: Ingredients,
      cookingTime: cookingTime + " minutes",
    };
    try {
      await projectFirebaseStore.collection("recipes").add(doc);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="createRecipe">
      <h1 className="page-title">Add new Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredients(e.target.value)}
              value={newIngredients}
              ref={ingredientsInput}
            />
            <button onClick={handelAdd}>Add</button>
          </div>
        </label>
        <p>
          Current ingredients:{" "}
          {Ingredients.map((i) => (
            <em key={i}>{i}, </em>
          ))}
        </p>

        <label>
          <span>Method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>
        <label>
          <span>cooking time (minute):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Create;
