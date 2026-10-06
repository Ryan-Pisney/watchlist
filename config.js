// Your Firebase config — generated from your "Add Firebase to your web app" screen.
// If the app ever says "Database not connected", re-check the apiKey below against Firebase.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC4ucAFFJjWPQc7b7wrGxniLJASGnjRaj8",
  authDomain: "watchlist-grillmaster.firebaseapp.com",
  databaseURL: "https://watchlist-grillmaster-default-rtdb.firebaseio.com",
  projectId: "watchlist-grillmaster",
  storageBucket: "watchlist-grillmaster.firebasestorage.app",
  messagingSenderId: "193985835722",
  appId: "1:193985835722:web:031f3814c3bbe28df2ba33"
};

// Who uses the watchlist (identity picker + card border colors). Edit freely.
const WHO_OPTIONS = [
  { name: "Jenny", color: "#ff9933" },   // orange
  { name: "Ryan",  color: "#a06bff" }    // purple
];

// Optional: TMDB (themoviedb.org) API key — enables "available on Netflix/Prime/..." chips.
// Free: themoviedb.org → sign up → Settings → API → Request API key (Developer, v3).
// Leave as-is and the app still works (Watch button uses JustWatch; chips just won't appear).
const TMDB_API_KEY = "PASTE_TMDB_KEY_HERE";
