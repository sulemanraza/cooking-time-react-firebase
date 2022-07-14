import { BrowserRouter, Routes, Route } from "react-router-dom";
// page components
import Navbar from "./components/Navbar";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";
import Recipe from "./pages/recipe/Recipe";
import Search from "./pages/search/Search";

//style
import "./App.css";
import ThemeSelector from "./components/ThemeSelector";
import useTheme from "./hook/useTheme";
import { useEffect } from "react";

function App() {
  const { mode } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor = mode === "dark" ? "#333" : "#dfdfdf";
  }, [mode]);

  return (
    <div className={`App `}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Routes>
          <Route exact path="/" element={<Home />} /> {/* home */}
          <Route path="/create" element={<Create />} /> {/* home */}
          <Route path="/recipes/:id" element={<Recipe />} /> {/* home */}
          <Route path="/search" element={<Search />} /> {/* home */}
          <Route path="*" element={<Home />} /> {/* home */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
