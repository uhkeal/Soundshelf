import { useState } from "react";
import { Link } from "react-router";
import tracks from "../data/tracks.json";

function StatCard(props) {
    return (
        <div className="col-md-4">
            <div className="profile-stat-card">
                <h3>{props.value}</h3>
                <p>{props.label}</p>
            </div>
        </div>
    );
}

function SongCard(props) {
    const song = props.song;
    const isFavorite = props.isFavorite;

    return (
        <div className="col-md-4">
            <div className="card bg-dark text-white h-100 border-secondary song-profile-card">
                <img
                    src={song.cover}
                    alt={song.title + " cover"}
                    className="card-img-top"
                />

                <div className="card-body">
                    <h3 className="h5">{song.title}</h3>
                    <p>{song.artist}</p>
                    <p className="text-light">{song.album}</p>

                    <div className="mb-3">
                        {song.tags.map((tag) => (
                            <span key={tag} className="badge bg-secondary me-1">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <button
                        type="button"
                        className={isFavorite ? "btn btn-danger" : "btn btn-purple"}
                        onClick={() => props.onToggleFavorite(song.title)}
                    >
                        {isFavorite ? "Remove Favorite" : "Add Favorite"}
                    </button>
                </div>
            </div>
        </div>
    );
}

function User() {
    const [favoriteSongs, setFavoriteSongs] = useState([]);
    const [selectedMood, setSelectedMood] = useState("All");

    const moods = ["All", "Synth-pop", "Electropop", "Pop"];

    const filteredTracks = selectedMood === "All"
        ? tracks
        : tracks.filter((song) => song.tags.includes(selectedMood));

    const favoriteTracks = tracks.filter((song) =>
        favoriteSongs.includes(song.title)
    );

    const profileStats = [
        { label: "Recently Played", value: tracks.length },
        { label: "Favorite Tracks", value: favoriteSongs.length },
        { label: "Playlists", value: 1 }
    ];

    function handleToggleFavorite(songTitle) {
        if (favoriteSongs.includes(songTitle)) {
            setFavoriteSongs(favoriteSongs.filter((title) => title !== songTitle));
        } else {
            setFavoriteSongs([...favoriteSongs, songTitle]);
        }
    }

    return (
        <div className="user">
            <main className="container mt-4">

                <section className="profile-header p-4 rounded mb-5 text-center">
                    <img
                        src="/images/gumball.jpg"
                        alt="Gumball profile"
                        className="profile-picture"
                    />

                    <h1 className="mt-3">Gumball</h1>

                    <p className="mb-0">
                        Discovering new music one playlist at a time.
                    </p>
                </section>

                <section className="mb-5">
                    <div className="row g-3">
                        {profileStats.map((stat) => (
                            <StatCard
                                key={stat.label}
                                label={stat.label}
                                value={stat.value}
                            />
                        ))}
                    </div>
                </section>

                <section className="mb-5">
                    <h2>Featured Playlist</h2>

                    <Link to="/playlist" className="featured-playlist-card">
                        <div>
                            <h3>Nonchalant Playlist</h3>
                            <p>A chill playlist for laid-back listening.</p>
                        </div>

                        <span>Open Playlist</span>
                    </Link>
                </section>

                <section className="mb-5">
                    <h2>Favorite Tracks</h2>

                    {favoriteTracks.length === 0 ? (
                        <p className="text-light">
                            No favorite tracks yet. Add songs from Recently Played.
                        </p>
                    ) : (
                        <ul className="list-group mt-2">
                            {favoriteTracks.map((song) => (
                                <li
                                    key={song.title}
                                    className="list-group-item bg-dark text-white border-secondary"
                                >
                                    {song.title} — {song.artist}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="mb-5">
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <h2>Recently Played</h2>

                        <div>
                            {moods.map((mood) => (
                                <button
                                    key={mood}
                                    type="button"
                                    className={
                                        selectedMood === mood
                                            ? "btn btn-purple me-2 mb-2"
                                            : "btn btn-outline-light me-2 mb-2"
                                    }
                                    onClick={() => setSelectedMood(mood)}
                                >
                                    {mood}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="row g-3 mt-2">
                        {filteredTracks.map((song) => (
                            <SongCard
                                key={song.title}
                                song={song}
                                isFavorite={favoriteSongs.includes(song.title)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                </section>

            </main>

            <footer>
                <p>&copy; 2026 SoundShelf</p>
            </footer>
        </div>
    );
}

export default User;