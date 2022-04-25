import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NavBar from "./components/NavBar";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import PostDetailPage from "./pages/PostDetailPage";
import AddPostPage from "./pages/AddPostPage";
import apiCalls from "./apis/apiCalls";
import EditCommentPage from "./pages/EditCommentPage";
import EditPostPage from "./pages/EditPostPage";
import NewsPage from "./pages/NewsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [currentMapCenter, setCurrentMapCenter] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(5);
  const [eventsActive, setEventsActive] = useState(true);
  const [alertsActive, setAlertsActive] = useState(true);
  const [emergenciesActive, setEmergenciesActive] = useState(true);
  const [selectedMapTileId, setSelectedMapTileId] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const [activeTime, setActiveTime] = useState("All");
  const [userLocated, setUserLocated] = useState(false);

  const userLocation = async () => {
    const location = await apiCalls.getUserLocation();
    if (location) {
      setCurrentMapCenter({ lat: location.latitude, lng: location.longitude });
      setCurrentZoom(13);
      setUserLocated(true);
    }
  };

  const confirmLoggedIn = async () => {
    const verificationResponse = await apiCalls.verifyUser();
    if (verificationResponse) {
      setUser(verificationResponse);
    }
  };

  useEffect(() => {
    confirmLoggedIn();
  }, []);

  useEffect(() => {
    userLocation();
  }, [user]);

  return (
    <div className="App">
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="" element={<WelcomePage />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<SignUp setUser={setUser} />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute user={user}>
                <HomePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-post"
            element={
              <ProtectedRoute user={user}>
                <AddPostPage
                  user={user}
                  setCurrentMapCenter={setCurrentMapCenter}
                  setCurrentZoom={setCurrentZoom}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/map"
            element={
              <ProtectedRoute user={user}>
                <MapPage
                  currentMapCenter={currentMapCenter}
                  setCurrentMapCenter={setCurrentMapCenter}
                  currentZoom={currentZoom}
                  setCurrentZoom={setCurrentZoom}
                  eventsActive={eventsActive}
                  setEventsActive={setEventsActive}
                  alertsActive={alertsActive}
                  setAlertsActive={setAlertsActive}
                  emergenciesActive={emergenciesActive}
                  setEmergenciesActive={setEmergenciesActive}
                  selectedMapTileId={selectedMapTileId}
                  setSelectedMapTileId={setSelectedMapTileId}
                  activeTime={activeTime}
                  setActiveTime={setActiveTime}
                  userLocated={userLocated}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/post/:id"
            element={
              <ProtectedRoute user={user}>
                <PostDetailPage
                  user={user}
                  setCurrentMapCenter={setCurrentMapCenter}
                  setCurrentZoom={setCurrentZoom}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-comment/:id"
            element={
              <ProtectedRoute user={user}>
                <EditCommentPage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-post/:id"
            element={
              <ProtectedRoute user={user}>
                <EditPostPage user={user} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/news"
            element={
              <ProtectedRoute user={user}>
                <NewsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <footer className="main-footer">Welcome {user && user.email}</footer>
      </Router>
    </div>
  );
}

export default App;
