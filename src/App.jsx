// misc
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { knowledgeData } from "./data/knowledgeData"
import { createContext, useState } from "react"

// pages
import Transliterator from "./pages/Transliterator.jsx"
import Knowledge from "./pages/Knowledge.jsx"
import Contacts from './pages/Contacts.jsx'
import NotFound from './pages/NotFound.jsx'
import KnowledgeExperiment from './pages/Knowledge.jsx'

// components
import Layout from "./pages/Layout.jsx"

export const KnowledgeContext = createContext()

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Transliterator />} />
            <Route path="knowledge" element={<Knowledge />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
            <Route path="knowledge-experiment" element={<KnowledgeExperiment />} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}