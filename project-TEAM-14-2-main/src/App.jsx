import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import Rankings from "./pages/Rankings";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import User from "./pages/User";
import SearchResults from "./pages/SearchResults";
import NotFoundPage from "./pages/NotFoundPage";



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:searchTerm" element={<SearchResults />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/upload" element={<Upload currentUser="Justin" />} />
        <Route path="/profile" element={<User />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;