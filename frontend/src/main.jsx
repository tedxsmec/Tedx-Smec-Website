// // frontend/src/main.jsx
// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import App from './App';

// import Home from './pages/Home';
// import Events from './pages/Events';
// import EventDetail from './pages/EventDetail';
// import BookingForm from './pages/BookingForm';
// import Speakers from './pages/Speakers';
// import SpeakerProfile from './pages/SpeakerProfile'; // optional: create if you want /speakers/:id
// import Sponsors from './pages/Sponsors';
// import Coordinators from './pages/Coordinators';
// import Organizers from './pages/Organizers';
// import About from './pages/About';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound'; // optional 404 page
// import { OrganizersPage, CoordinatorsPage } from './pages/OrganizersCoordinators';
// import TeamPage from './pages/Team';


// import './index.css';

// createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         {/* App is the layout (navbar + footer + Outlet) */}
//         <Route path="/" element={<App />}>
//           {/* Home */}
//           <Route index element={<Home />} />

//           {/* Events */}
//           <Route path="events" element={<Events />} />
//           <Route path="events/:slug" element={<EventDetail />} />
//           <Route path="events/:slug/book" element={<BookingForm />} />

//           {/* Speakers */}
//           <Route path="speakers" element={<Speakers />} />
//           <Route path="speakers/:id" element={<SpeakerProfile />} />

//           {/* Sponsors / Coordinators / Organizers */}
//           <Route path="sponsors" element={<Sponsors />} />
//           <Route path="coordinators" element={<Coordinators />} />
//           <Route path="organizers" element={<Organizers />} />

//           {/* Other */}
//           <Route path="about" element={<About />} />
//           <Route path="contact" element={<Contact />} />

//           {/* <Route path="/team" element={<OrganizersPage />} /> */}


//           <Route path="/team" element={<TeamPage />} />



//           {/* Catch-all */}
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );




import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop";
import App from './App';
// Pages
import Home from './pages/Home';
import About from './pages/About';
import Speakers from './pages/Speakers';
import SpeakerProfile from './pages/SpeakerProfile';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
// import BookingForm from './components/BookingModal';
import BookingForm from './pages/BookingPage';

import './index.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path="speakers" element={<Speakers />} />
          <Route path="speakers/:id" element={<SpeakerProfile />} />

          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />

          <Route path="sponsors" element={<Sponsors />} />
          <Route path="team" element={<Team />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="events/:slug/book" element={<BookingForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);