// utilities
import { Outlet } from "react-router-dom"
import { useState, useEffect, createContext } from "react"

// components
import HeaderKebabMenuDesktop from "./HeaderKebabMenuDesktop.jsx"
import HeaderKebabMenuMobile from "./HeaderKebabMenuMobile.jsx"
import HeaderLaguageMenuDesktop from "./HeaderLanguageMenuDesktop.jsx"
import HeaderLanguageMenuMobile from "./HeaderLanguageMenuMobile.jsx"
import HeaderLetteringAndLogo from "./HeaderLetteringAndLogo.jsx"

export const LayoutContext = createContext()

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false) // this state controls the kebab menu, whether it's opened or not
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false) // this state controls the language menu, whether it's opened or not
    const [language, setLanguage] = useState()

    // this effect saves lanuage preferences in the local storage
    useEffect(() => {
        if (localStorage.getItem("language")) {
            setLanguage(localStorage.getItem("language"))
        } else {
            setLanguage("ENG")
        }
    }, [])

    const [vpWidth, setVPWidth] = useState(window.innerWidth)
    useEffect(() => {
        function handleResize() {
            setVPWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    })

    const layoutContext = {
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
                <LayoutContext.Provider value={layoutContext}>
                    <HeaderLetteringAndLogo />
                    {/* <div>vpWidth = {vpWidth}</div> */}
                    {
                        vpWidth > 1919
                            ?
                            <>
                                <HeaderLaguageMenuDesktop />
                                <HeaderKebabMenuDesktop />
                            </>
                            :
                            <>
                                <HeaderLanguageMenuMobile />
                                <HeaderKebabMenuMobile />
                            </>
                    }
                </LayoutContext.Provider >
            </div >

            <Outlet context={language} />
        </>
    )
}