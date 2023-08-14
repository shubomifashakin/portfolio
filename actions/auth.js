// const clientId = d1ea2b45fa074764af0f2a9ba2dcb9d0;
// const redirect = "http://localhost:5173";

let xi = 24;

function randomString() {
  const chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`;
  let text;
  const arr = chars.split("");
  for (let x = 0; x <= xi; x++) {
    text += chars[Math.trunc(Math.random() * xi)];
  }

  return text;
}

const spotId = "31j37n4ozyugs33eoy4g6nb6wxru";

const CLIENT_ID = "d1ea2b45fa074764af0f2a9ba2dcb9d0";
const REDIRECT_URI = "http://localhost:5173/";
const SCOPES = "playlist-read-collaborative playlist-read-private"; // Example scopes

// Construct the authorization URL
const authorizeUrl =
  `https://accounts.spotify.com/authorize?` +
  `client_id=${CLIENT_ID}` +
  `&response_type=token` +
  `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  `&scope=${encodeURIComponent(SCOPES)}`;

const urlSearchParams = new URLSearchParams(document.URL.split("#")[1]);

// Extract the access_token parameter value
const accessToken = urlSearchParams.get("access_token");

if (!accessToken && !localStorage.getItem("logged-in")) {
  window.location.href = authorizeUrl;
  localStorage.setItem("logged-in", randomString());
}

export async function getPlaylists() {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/users/${spotId}/playlists?limit=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (err) {}
}
