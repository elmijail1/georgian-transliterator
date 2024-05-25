// components
import MenuDesktop from "../components/Layout/MenuDesktop.jsx"
import MenuMobile from "../components/Layout/MenuMobile.jsx"
import LanguagesDesktop from "../components/Layout/LanguagesDesktop.jsx"
import LanguagesMobile from "../components/Layout/LanguagesMobile.jsx"
import LetteringAndLogo from "../components/Layout/LetteringAndLogo.jsx"

import { Outlet } from "react-router-dom"
import { useState, useEffect, createContext } from "react"

export const LayoutContext = createContext()

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false) // this state controls the kebab menu, whether it's opened or not
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false) // this state controls the language menu, whether it's opened or not
    const [language, setLanguage] = useState() // this state controls the UI's language

    // this effect saves language preferences in the local storage
    useEffect(() => {
        if (localStorage.getItem("language")) {
            setLanguage(localStorage.getItem("language"))
        } else {
            setLanguage("ENG")
        }
    }, [])

    const [vpWidth, setVPWidth] = useState(window.innerWidth) // this state controls width of the viewport
    // this effect updates the vpWidth state whenever the viewport's width changes
    useEffect(() => {
        function handleResize() {
            setVPWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    })

    // these are states & functions shared with components via LayoutContext
    const layoutContextContents = {
        language,
        languageMenuOpen,
        menuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen,
    }

    return (
        <>
            <div className="Header">
                <LayoutContext.Provider value={layoutContextContents}>

                    <LetteringAndLogo />

                    <div className="Header__RightBox">

                        {
                            vpWidth > 999
                                ?
                                <>
                                    <LanguagesDesktop />
                                    <MenuDesktop />
                                </>
                                :
                                <>
                                    <LanguagesMobile />
                                    <MenuMobile />
                                </>
                        }
                    </div>

                </LayoutContext.Provider >
            </div >

            <Outlet context={{language, vpWidth}} />
        </>
    )
}