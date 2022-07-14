import { useSearchParams } from "react-router-dom";
import RecipeList from "../../components/RecipeList";
import { useFetch } from "../../hook/useFetch";
// style
import "./Search.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const url = `http://localhost:3000/recipes?q=${searchParams.get("q")}`;

  const { data: recipes, isPending, error } = useFetch(url);

  return (
    <div className="search">
      <h2 className="page-title">
        Recipes including "{searchParams.get("q")}"
      </h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
};

export default Search;
