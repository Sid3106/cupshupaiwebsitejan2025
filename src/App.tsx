import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './components/navigation/NavigationContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/navigation/ScrollToTop';
import { serviceRoutes } from './routes/serviceRoutes';
import { Hero } from './components/sections/Hero';
import { Services } from './components/sections/Services';
import { About } from './components/sections/About';
import { ClientSection } from './components/clients/ClientSection';
import { Team } from './components/sections/Team';
import { Blog } from './components/sections/Blog';
import { Contact } from './components/sections/Contact';
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics';
import { Manifesto } from './components/manifesto/Manifesto';
import BlogPage from './components/BlogPage';
import { AboutUsPage } from './components/pages/AboutUs/AboutUsPage';


function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About/>
      <ClientSection />
      <Team />
      <BlogPage />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <NavigationProvider>
        <ScrollToTop />
        <GoogleAnalytics measurementId="G-MMMNTBXCQ0" />
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path='/team' element={<Team />} />
            <Route path='/services' element={<Services/>}/>
            <Route path='/about' element={<AboutUsPage/>}/>
            <Route path='/manifesto' element={<Manifesto/>}/>
            
            {serviceRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
          <Footer />
        </div>
      </NavigationProvider>
    </Router>
  );
}