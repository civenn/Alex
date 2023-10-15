// Replace with your own Spotify API credentials
const clientId = "708e2490bd4b4115b044bbc0858a9288";
const clientSecret = "1751ed1f533e43c98d8eb6b7bf21d2fc";

// Authenticate with Spotify using OAuth 2.0 (you'll need to implement this)

// Use the artist ID to get their top tracks or albums
const artistId = "4kW5tzPanapA9sFFMEueNn";
const artistTracksEndpoint = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;

// Make a GET request to get the artist's top tracks
fetch(artistTracksEndpoint, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${YOUR_ACCESS_TOKEN}`, // Include your access token here
  },
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the data to extract the list of songs
    const songs = data.tracks;
    console.log(songs);
  })
  .catch((error) => console.error(error));

const songs = ["Song 1", "Song 2", "Song 3"]; // Replace with fetched data
const songList = document.getElementById("songList");

songs.forEach((song) => {
  const listItem = document.createElement("li");
  listItem.textContent = song;
  songList.appendChild(listItem);
});
