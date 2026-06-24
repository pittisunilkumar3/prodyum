import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ITHeader from './components/ITHeader';
import ITFooter from './components/ITFooter';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';
import CustomCursor from './components/cursor/CustomCursor';
import CinemaBackground from './components/entertainment/CinemaBackground';
import FilmGrain from './components/entertainment/FilmGrain';

// Entertainment Pages
import Landing from './pages/Landing';
import ComingSoon from './pages/ComingSoon';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Investors from './pages/Investors';
import Casting from './pages/Casting';
import Contact from './pages/Contact';

// IT Pages
import ITHome from './pages/it/Home';
import ITServices from './pages/it/Services';
import ITPortfolio from './pages/it/Portfolio';
import ITAbout from './pages/it/About';
import ITCareers from './pages/it/Careers';
import ITContact from './pages/it/Contact';

// Layout component for Entertainment section
const EntertainmentLayout = ({ children }) => (
  <>
    <CinemaBackground />
    <FilmGrain />
    <Header />
    {children}
    <Footer />
  </>
);

// Layout component for IT section
const ITLayout = ({ children }) => (
  <>
    <ITHeader />
    {children}
    <ITFooter />
  </>
);

function App() {
  // Fade out the instant cinematic splash once React has mounted & painted,
  // then remove it from the DOM.
  useEffect(() => {
    const splash = document.getElementById('pd-splash');
    if (!splash) return undefined;
    const t = setTimeout(() => {
      splash.classList.add('pd-hide');
      setTimeout(() => splash.remove(), 700);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <CustomCursor />
        <ScrollToTop />
        <Routes>
          {/* Landing Page - Root */}
          <Route path="/" element={<Landing />} />

          {/* IT Prodyum - Main Website */}
          <Route path="/it" element={<ITHome />} />
          <Route path="/it/services" element={<ITServices />} />
          <Route path="/it/portfolio" element={<ITPortfolio />} />
          <Route path="/it/about" element={<ITAbout />} />
          <Route path="/it/careers" element={<ITCareers />} />
          <Route path="/it/contact" element={<ITContact />} />

          {/* Legacy IT route redirect */}
          <Route path="/it-prodyum" element={<ITHome />} />

          {/* Prodyum Entertainments - Main Website */}
          <Route path="/entertainment" element={<EntertainmentLayout><Home /></EntertainmentLayout>} />
          <Route path="/entertainment/projects" element={<EntertainmentLayout><Projects /></EntertainmentLayout>} />
          <Route path="/entertainment/services" element={<EntertainmentLayout><Services /></EntertainmentLayout>} />
          <Route path="/entertainment/investors" element={<EntertainmentLayout><Investors /></EntertainmentLayout>} />
          <Route path="/entertainment/casting" element={<EntertainmentLayout><Casting /></EntertainmentLayout>} />
          <Route path="/entertainment/contact" element={<EntertainmentLayout><Contact /></EntertainmentLayout>} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
