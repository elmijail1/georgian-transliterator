// general
import { Outlet } from "react-router-dom"
import { useState, useEffect, createContext } from "react"
// components
import MenuDesktop from "../components/Layout/MenuDesktop.jsx"
import MenuMobile from "../components/Layout/MenuMobile.jsx"
import LanguagesDesktop from "../components/Layout/LanguagesDesktop.jsx"
import LanguagesMobile from "../components/Layout/LanguagesMobile.jsx"
import LetteringAndLogo from "../components/Layout/LetteringAndLogo.jsx"

export const LayoutContext = createContext()

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false) // States 1.1*
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false) // States 1.2*
    const [language, setLanguage] = useState() // States 1.3*

    useEffect(() => {   // States 1.3.1*
        if (localStorage.getItem("language")) {
            setLanguage(localStorage.getItem("language"))
        } else {
            setLanguage("ENG")
        }
    }, [])

    const [vpWidth, setVPWidth] = useState(window.innerWidth) // States 1.4*
    useEffect(() => {   // States 1.4.1*
        function handleResize() {
            setVPWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    })

    const layoutContextContents = {    // Context 2*
        language,
        languageMenuOpen,
        menuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen,
    }

    return (
        <>
            <div className="Layout__GeneralDiv">
                <LayoutContext.Provider value={layoutContextContents}>

                    <LetteringAndLogo />

                    <div className="Layout__MenusDiv">

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

{/*
RENDER STRUCTURE
1. LetteringAndLogo
2. MenusDiv
2.1. Languages
2.2. MenuDesktop / MenuMobile
MenuDesktop is rendered if vpWidth (1.4) is larger than 999.
3. Outlet
.
COMMENTS
1. States
1.1. menuOpen: it controls if the mobile menu (kebab) is shown. The full layout of
that menu can be found in the MenuMobile component.
1.2. languageMenuOpen: it controls if the language menu is shown. It's featured in
both the mobile & desktop versions. Its full layout can be found in the Languages
component.
1.3. language: it controls he UI language of all the pages. The user chooses which
language they'd like to see the texts in. The active value is passed to the outlet
and most pages use it to determine which text should be displayed.
1.3.1. An effect saves the latest language value to the localStorage to keep the UI
displaying texts in the same language as the user has chosen. If the localStorage
is empty, the default value of the language will be "ENG" (English).
1.4. vpWidth: it controls the width of the viewport. Its value is used to determine
which version must be displayed: mobile or desktop.
1.4.1. This effect updates the vpWidth state whenever the viewport's width changes.
There's no dependency array, hence it's triggered by any change on the page.
.
2. Context
It contains states & functions shared with the Layout components via LayoutContext.
*/}