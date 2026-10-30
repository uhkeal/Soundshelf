import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const initialSongs = [
  { rank: 1, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: "3:20", score: 10 },
  { rank: 2, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: "3:23", score: 9 },
  { rank: 3, title: "Stay", artist: "The Kid LAROI, Justin Bieber", album: "F*CK LOVE 3", duration: "2:21", score: 8 },
  { rank: 4, title: "Good 4 U", artist: "Olivia Rodrigo", album: "SOUR", duration: "2:58", score: 7 },
  { rank: 5, title: "Beauty and the Beat", artist: "Justin Bieber", album: "Believe", duration: "3:48", score: 6 },
  { rank: 6, title: "Standing Next to You", artist: "Jung Kook", album: "Golden", duration: "3:27", score: 5 },
  { rank: 7, title: "Golden", artist: "Huntrix", album: "KPop Demon Hunters", duration: "3:19", score: 4 },
  { rank: 8, title: "Judas", artist: "Lady Gaga", album: "Judas", duration: "4:10", score: 3 },
  { rank: 9, title: "I Wonder", artist: "Kanye", album: "Graduation", duration: "4:03", score: 2 },
  { rank: 10, title: "3005", artist: "Childish Gambino", album: "Because the Internet", duration: "3:55", score: 1 }
];

function Rankings() {
  const [songs, setSongs] = useState(initialSongs);

  function handleUpvote(title) {
    const updatedSongs = songs
      .map((song) => {
        if (song.title === title) {
          return {
            ...song,
            score: song.score + 1
          };
        }

        return song;
      })
      .sort((a, b) => b.score - a.score)
      .map((song, index) => ({
        ...song,
        rank: index + 1
      }));

    setSongs(updatedSongs);
  }

  return (
    <div className="rankings">
      <main>
        <section className="playlist-hero">
          <div className="playlist-info">
            <h1 className="playlist-title">Top Ranked Songs Global</h1>
          </div>
        </section>

        <section className="playlist-tracks">
          <div style={{ width: "100%", height: 400, marginBottom: "2rem" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={songs}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 50
                }}
              >
                <XAxis
                  dataKey="title"
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={60}
                />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <table className="table custom-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Duration</th>
              <th>Score</th>
              <th>Vote</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song) => (
              <tr className="track-row" key={song.title}>
                <td className="track-number">{song.rank}</td>
                <td className="track-title">{song.title}</td>
                <td className="track-artist">{song.artist}</td>
                <td className="track-album">{song.album}</td>
                <td className="track-duration">{song.duration}</td>
                <td>{song.score}</td>
                <td>
                  <button
                    className="btn btn-sm btn-purple"
                    type="button"
                    onClick={() => handleUpvote(song.title)}
                  >
                    Upvote
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer>
        <p>&copy; 2026 SoundShelf</p>
      </footer>
    </div>
  );
}

export default Rankings;