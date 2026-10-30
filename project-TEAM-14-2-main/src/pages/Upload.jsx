import { useState, useEffect } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";

function SongCard (props) {
    const song = props.song;
    const tagsArray = song.tags ? Object.values(song.tags) : [];
    const tagList = tagsArray.map((tag) => {
        return (<span key={tag}> {tag} </span>);
    });

    let youtubeLinkElement = "";
    if (song.youtubeLink !== "") {
        youtubeLinkElement = (
            <a href={song.youtubeLink}>
                YouTube Link
            </a>
        );
    } else {
        youtubeLinkElement = (
            <p>No YouTube link provided</p>
        );
    }

    let coverElement = "";
    if (song.cover && song.cover !== "") {
        coverElement = (
            <img className="song-cover" src={song.cover} alt={song.title + " cover"}/>
        );
    } else {
        coverElement = (
            <div className="song-cover song-cover-placeholder">No cover</div>
        );
    }

    return (
        <div className="song-card">
            {coverElement}
            <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
                <p>{song.album}</p>
                <p>{song.duration}</p>
                <div className="song-tags">
                    {tagList}
                </div>   
                <div className="song-link">
                    {youtubeLinkElement}
                </div>
            </div>
        </div>
    );
}

function Upload(props) {

    // currentUser prop — who is uploading the track
    const currentUser = props.currentUser;

    // State for all form fields (controlled inputs)
    const [songName, setSongName] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [duration, setDuration] = useState("");
    const [cover, setCover] = useState("");
    const [youtubeLink, setYoutubeLink] = useState("");
    const [tags, setTags] = useState("");

    const [tracks, setTracks] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Listen to Firebase for live track updates
    useEffect(() => {
        const tracksRef = ref(db, "tracks");
        const unsubscribe = onValue(tracksRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setTracks(Object.values(data));
            } else {
                setTracks([]);
            }
        }, () => {
            setError("Failed to load tracks.");
        });
        return () => unsubscribe();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!songName) return;

        setLoading(true);
        setError(null);
        setSuccessMessage("");

        const newTrack = {
            title: songName,
            artist: artist ? artist : currentUser,
            album: album,
            duration: duration ? duration : "0:00",
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
            youtubeLink: youtubeLink,
            cover: cover
        };

        try {
            await push(ref(db, "tracks"), newTrack);
            setSuccessMessage(`"${songName}" was uploaded successfully!`);
            setSongName("");
            setArtist("");
            setAlbum("");
            setDuration("");
            setCover("");
            setYoutubeLink("");
            setTags("");
        } catch (err) {
            setError("Upload failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const songCards = tracks.map((song) => {
        return (<SongCard key={song.title} song={song}/>);
    });

    return (
        <div className="upload">
            <main>
                <header>
                    <h2>Upload your Music!</h2>
                    <p>Uploading as <strong>{currentUser}</strong></p>
                </header>

                <section>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="song-name">Song Name:</label>
                            <input
                                id="song-name"
                                type="text"
                                name="song-name"
                                placeholder="Enter song name"
                                value={songName}
                                onChange={(e) => setSongName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="artist">Artist:</label>
                            <input
                                id="artist"
                                type="text"
                                name="artist"
                                placeholder="Enter artist name"
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="album">
                                Album:
                            </label>

                            <input
                                id="album"
                                type="text"
                                name="album"
                                placeholder="Enter album name"
                                value={album}
                                onChange={(event) => setAlbum(event.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="duration">Duration:</label>
                            <input
                                id="duration"
                                type="text"
                                name="duration"
                                placeholder="e.g. 3:20"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="music-file">Upload File:</label>
                            <input
                                id="music-file"
                                type="file"
                                name="music-file"
                            />
                        </div>

                        <div>
                            <label htmlFor="song-cover">Cover Image URL:</label>
                            <input
                                id="song-cover"
                                type="url"
                                name="song-cover"
                                placeholder="https://example.com/cover.jpg"
                                value={cover}
                                onChange={(e) => setCover(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="youtube-link">YouTube Link (Optional):</label>
                            <input
                                id="youtube-link"
                                type="url"
                                name="youtube-link"
                                placeholder="https://youtube.com/watch?v=..."
                                value={youtubeLink}
                                onChange={(e) => setYoutubeLink(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="tags">Tags:</label>
                            <input
                                id="tags"
                                type="text"
                                name="tags"
                                placeholder="e.g. pop, lo-fi, rap"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Uploading..." : "Upload"}
                        </button>

                    </form>

                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}

                </section>

                {/* Track list re-renders when tracks state changes */}
                <section className="uploaded-tracks">
                    <h3>All Tracks ({tracks.length})</h3>
                    <ul>
                        {tracks.map((track, index) => (
                            <li key={index}>
                                <strong>{track.title}</strong> — {track.artist}
                            </li>
                        ))}
                    </ul>

                    <div>
                        {songCards}
                    </div>
                </section>

            </main>

            <footer>
                <p>&copy; 2026 SoundShelf</p>
            </footer>
            
        </div>
    );
}

export default Upload;
