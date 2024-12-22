import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Explore from './components/Explore/Explore';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Itineraries from './components/Itineraries/Itineraries';
import { SignedIn } from "@clerk/clerk-react";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/itineraries" element={<Itineraries />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function ProtectedRoute({ children }) {
  return (
    <SignedIn>
      {children}
    </SignedIn>
  );
}

export default App;
