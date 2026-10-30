import { Link, useNavigate } from "react-router";
import { useState } from "react";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = function(event) {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate("/search/" + encodeURIComponent(searchTerm.trim()));
        }
    }
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark" id="nav-bar">
            <div className="container-fluid">

                <Link className="navbar-brand" to="/"></Link>

                <div className="nav-center">
                    <img
                        src="/logos/soundshelf-logo.svg"
                        alt="Logo"
                        className="nav-logo"
                    />
                </div>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav me-auto">

                        <li className="nav-item">
                            <Link className="nav-link" to="/">  Home </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/search">  Search </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/upload">  Upload </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/playlist">  Playlist </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/rankings">  Rankings </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">  Profile </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/login">  Login </Link>
                        </li>

                    </ul>

                    <form className="d-flex ms-auto" onSubmit={handleSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />

                        <button className="btn btn-purple" type="submit">
                            Search
                        </button>
                    </form>

                </div>
            </div>
            </nav>
        </header>
    );
}

export default Navbar;