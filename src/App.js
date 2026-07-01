import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';

// Entertainment Pages
import Landing from './pages/Landing';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';

// IT Pages (single-page site composed in ITHome)
import ITHome from './pages/it/Home';

// Layout component for Entertainment section
const EntertainmentLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Landing Page - Root */}
          <Route path="/" element={<Landing />} />

          {/* IT Prodyum - Single Page Site */}
          <Route path="/it" element={<ITHome />} />

          {/* Legacy IT routes redirect to sections on the single page */}
          <Route path="/it/services" element={<Navigate to="/it#services" replace />} />
          <Route path="/it/portfolio" element={<Navigate to="/it#portfolio" replace />} />
          <Route path="/it/about" element={<Navigate to="/it#about" replace />} />
          <Route path="/it/careers" element={<Navigate to="/it#careers" replace />} />
          <Route path="/it/contact" element={<Navigate to="/it#contact" replace />} />

          {/* Legacy IT route redirect */}
          <Route path="/it-prodyum" element={<Navigate to="/it" replace />} />

          {/* Prodyum Entertainments - Single Page Site */}
          <Route path="/entertainment" element={<EntertainmentLayout><Home /></EntertainmentLayout>} />

          {/* Legacy entertainment routes redirect to sections on the single page */}
          <Route path="/entertainment/projects" element={<Navigate to="/entertainment#projects" replace />} />
          <Route path="/entertainment/services" element={<Navigate to="/entertainment#services" replace />} />
          <Route path="/entertainment/investors" element={<Navigate to="/entertainment#investors" replace />} />
          <Route path="/entertainment/casting" element={<Navigate to="/entertainment#casting" replace />} />
          <Route path="/entertainment/contact" element={<Navigate to="/entertainment#contact" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
