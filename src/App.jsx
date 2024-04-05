// misc
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Transliterator from "./pages/Transliterator.jsx"
import Knowledge from "./pages/Knowledge.jsx"
import NotFound from './pages/NotFound.jsx'

// components
import Layout from "./components/Layout.jsx"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Transliterator />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="*" element={<NotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}