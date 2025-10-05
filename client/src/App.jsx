import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import './App.css';

// Check for token on initial load
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwtDecode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

const App = () => {
  useEffect(() => {
    // Additional setup if needed on mount
  }, []);

  return (
    <Provider store={store}>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <div className="App">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:handle" element={<Profile />} />
            
            {/* Private Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/create-profile" 
              element={
                <PrivateRoute>
                  <CreateProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/edit-profile" 
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/add-experience" 
              element={
                <PrivateRoute>
                  <AddExperience />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/add-education" 
              element={
                <PrivateRoute>
                  <AddEducation />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/feed" 
              element={
                <PrivateRoute>
                  <Posts />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/post/:id" 
              element={
                <PrivateRoute>
                  <Post />
                </PrivateRoute>
              } 
            />
            
            {/* 404 Route */}
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
          <Footer />  
        </div>
      </Router>
    </Provider>
  );
};

export default App;