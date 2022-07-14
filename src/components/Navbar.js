import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import useTheme from "../hook/useTheme";
// style
import "./Navbar.css";

const Navbar = () => {
  const { color } = useTheme();
  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="logo">
          <h1> Cooking Time</h1>
        </Link>

        <div className="search_create">
          <Searchbar />
          <Link to="/create">Create Recipe</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
