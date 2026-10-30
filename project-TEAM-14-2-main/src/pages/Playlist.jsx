import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";

function Playlist() {
    const [tracks, setTracks] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const filteredTracks = tracks.filter(track =>
        track.title.toLowerCase().includes(filter.toLowerCase()) ||
        track.artist.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            <div className="playlist">
                <main>
                    <section className="playlist-hero">
                        <img
                            className="playlist-cover"
                            src="/images/nonchalant.jpg"
                            alt="Playlist cover art"
                        />

                        <div className="playlist-info">
                            <p className="playlist-label">Playlist</p>

                            <h1 className="playlist-title">
                                nonchalant playlist
                            </h1>

                            <p className="playlist-meta">
                                Created by Luka Dončić{" "}
                                <span className="playlist-creator"></span>
                            </p>

                            <p className="playlist-stats">
                                {filteredTracks.length} songs
                            </p>
                        </div>
                    </section>

                    <section className="playlist-controls">

                        <input
                            type="text"
                            placeholder="Filter by title or artist..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="form-control playlist-filter"
                        />
                    </section>

                    <section className="playlist-tracks">
                        {loading && <p>Loading tracks...</p>}
                        {error && <p className="error-message">{error}</p>}

                        {!loading && !error && (
                            <table className="table custom-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Artist</th>
                                        <th>Album</th>
                                        <th>Duration</th>
                                        <th>Play</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTracks.map((track, index) => (
                                        <tr className="track-row" key={index}>
                                            <td className="track-number">{index + 1}</td>
                                            <td className="track-title">{track.title}</td>
                                            <td className="track-artist">{track.artist}</td>
                                            <td className="track-album">{track.album}</td>
                                            <td className="track-duration">{track.duration}</td>
                                            <td>
                                                {track.youtubeLink && (
                                                    <a
                                                        className="song-play-button"
                                                        href={track.youtubeLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Play
                                                    </a>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        {!loading && filteredTracks.length === 0 && !error && (
                            <p>No tracks found.</p>
                        )}
                    </section>
                </main>

                <footer>
                    <p>&copy; 2026 SoundShelf</p>
                </footer>
            </div>
        </>
    );
}

export default Playlist;
