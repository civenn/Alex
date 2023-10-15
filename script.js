// Replace with your own Spotify API credentials
const clientId = "708e2490bd4b4115b044bbc0858a9288";
const clientSecret = "1751ed1f533e43c98d8eb6b7bf21d2fc";

// Specify the artist's ID
const artistId = "4kW5tzPanapA9sFFMEueNn";
const artistTracksEndpoint = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;

// Specify your application's Redirect URI
const redirectUri = "https://barnardmusic.netlify.app/";

// Create a link to Spotify's authorization endpoint
const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-private%20user-read-email&state=your_state_string`;

// Open the authorization URL in a new window or a pop-up to allow the user to log in and authorize your app
window.open(authorizeUrl, "_blank");

// After the user authorizes your app and is redirected back with an authorization code, extract it from the URL
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get("code");

// Send a POST request to the token endpoint to obtain the access token
fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirectUri}`,
  headers: {
    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
})
  .then((response) => response.json())
  .then((data) => {
    const accessToken = data.access_token;

    // Use the access token to make API requests to Spotify
    const artistTracksEndpoint = `https://api.spotify.com/v1/artists/${artistId}/top-tracks`;

    fetch(artistTracksEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the data to extract the list of songs
        const songs = data.tracks;
        console.log(songs);

        // Create and display the list of songs on your webpage
        const songList = document.getElementById("songList");

        songs.forEach((song) => {
          const listItem = document.createElement("li");
          listItem.textContent = song.name;
          songList.appendChild(listItem);
        });
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
