import { Link } from "react-router-dom";
import deleteIcon from "../assets/delete.svg";
import { projectFirebaseStore } from "../firebase/config";
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
  if (recipes.length === 0) {
    return <div className="error">😞 😞 No recipes to load.... </div>;
  }

  const handleClick = (id) => {
    projectFirebaseStore.collection("recipes").doc(id).delete();
  };

  return (
    <div className="recipeList">
      {recipes.map((recipe) => (
        <div className="card" key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
          <div className="delete">
            <img
              src={deleteIcon}
              alt="delete icon"
              onClick={() => handleClick(recipe.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
