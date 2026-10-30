import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import initialTracks from "../data/tracks.json";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

function SearchResults() {
    const urlParams = useParams();
    const searchTerm = urlParams.searchTerm;
    const [newSearchTerm, setNewSearchTerm] = useState("");
    const [selectedTag, setSelectedTag] = useState("Reset");
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = function(event) {
        event.preventDefault();
        if (newSearchTerm.trim() !== "") {
            navigate("/search/" + encodeURIComponent(newSearchTerm.trim()));
        }
    }

    useEffect(() => {
        const tracksRef = ref(db, "tracks");
        const unsubscribe = onValue(tracksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const trackList = Object.values(data);
                setTracks(trackList);
            } else {
                setTracks([]);
            }
            setLoading(false);
        }, (err) => {
            setError("Failed to load tracks.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const allTags = tracks.reduce((tagList, track) => {
        let trackTags = [];
        if (track.tags) {
            trackTags = Object.values(track.tags);
        }
        trackTags.forEach((tag) => {
            if (!tagList.includes(tag)) {
                tagList.push(tag);
            }
        });

        return tagList;
    }, ["Reset"]);

    const tagButtons = allTags.map((tag) => {
        return (
            <button
                className="tag-filter-button"
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
            >
                {tag}
            </button>
        );
    });

    const resultTracks = tracks.filter((track) => {
        let trackTags = [];
        if (track.tags) {
            trackTags = Object.values(track.tags);
        }
        return (
            track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
            track.album.toLowerCase().includes(searchTerm.toLowerCase())
        ) &&
        (
            selectedTag === "Reset" ||
            trackTags.includes(selectedTag)
        );
    });

    const songCards = resultTracks.map((song) => {
        let songTags = [];
        if (song.tags) {
            songTags = Object.values(song.tags);
        }
        const tagList = songTags.map((tag) => {
            return (
                <span key={tag}>
                    {tag}
                </span>
            );
        });

        let playButton = "";
        if (song.youtubeLink) {
            playButton = (
                <a
                    className="song-play-button"
                    href={song.youtubeLink}
                    target="_blank"
                    rel="noreferrer"
                >
                    Play
                </a>
            );
        }

        return (
            <div className="song-card">
                <img className="song-cover" src={song.cover} alt={song.title + " cover"}/>
                <div className="song-info">
                    <h3>{song.title}</h3>
                    <p>{song.artist}</p>
                    <p>{song.album}</p>
                    <p>{song.duration}</p>
                    <div className="song-tags">
                        {tagList}
                    </div>
                    {playButton}
                </div>
            </div>
        );
    });



    return (
        <div className="search-results">
            <main>
                <h1>Search Results</h1>
                <form className="group" onSubmit={handleSubmit}>
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                        <g>
                            <path
                                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                            ></path>
                        </g>
                    </svg>

                    <input
                        id="result-query"
                        className="input"
                        type="search"
                        placeholder="Search..."
                        name="searchbar"
                        value={newSearchTerm}
                        onChange={(event) => setNewSearchTerm(event.target.value)}
                    />

                    <button className="search-button" type="submit">
                        Search
                    </button>
                </form>

                <section className="tag-filter-section">
                    <h2>Filter by tag</h2>
                    <div className="tag-filter-list">
                        {tagButtons}
                    </div>
                </section>

                <p>Search results for: {searchTerm}</p>
                {loading && <p>Loading tracks...</p>}
                {error && <p className="error-message">{error}</p>}
                {!loading && !error && (
                    <section>
                        <h2>{resultTracks.length} results found</h2>
                        {songCards}
                    </section>
                )}
            </main>

            <footer>
                <p>&copy; 2026 SoundShelf</p>
            </footer>
        </div>
    );
}

export default SearchResults;
