// general
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createContext } from "react"
// pages
import Contacts from './pages/Contacts.jsx'
import Home from "./pages/Home.jsx"
import Knowledge from "./pages/Knowledge.jsx"
import Layout from "./pages/Layout.jsx"
import NotFound from './pages/NotFound.jsx'
import MapOutputTest from './pages/MapOutputTest.jsx'

export const KnowledgeContext = createContext()

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
            <Route path="map-output-test" element={<MapOutputTest />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}