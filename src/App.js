import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ITPageWrapper from './components/ITPageWrapper';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from './components/ui/toaster';

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
import SmokeyCursorEffect from './components/ui/smokey-cursor-effect';

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
          
          {/* IT Prodyum - Main Website */}
          <Route path="/it" element={<SmokeyCursorEffect />} />
          <Route path="/it/services" element={<ITPageWrapper><ITServices /></ITPageWrapper>} />
          <Route path="/it/portfolio" element={<ITPageWrapper><ITPortfolio /></ITPageWrapper>} />
          <Route path="/it/about" element={<ITPageWrapper><ITAbout /></ITPageWrapper>} />
          <Route path="/it/careers" element={<ITPageWrapper><ITCareers /></ITPageWrapper>} />
          <Route path="/it/contact" element={<ITPageWrapper><ITContact /></ITPageWrapper>} />
          
          {/* Legacy IT route redirect */}
          <Route path="/it-prodyum" element={<ITPageWrapper><ITHome /></ITPageWrapper>} />
          
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
