import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <Home user={user} /> : <Login />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route exact path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
