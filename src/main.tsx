import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import './styles/globals.module.css'
import './styles/globals.css'
import Testimonials from './pages/Testimonials.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import "styles/globals.css";

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
