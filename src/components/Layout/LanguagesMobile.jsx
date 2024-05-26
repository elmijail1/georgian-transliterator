// general
import { useContext, useRef, useEffect } from "react"
// data
import { languagesData } from "../../data/layoutData.js"
// utilities
import { closeMenuIfClickedElsewhere } from "../../utilities/layoutUtilities.js"
// context
import { LayoutContext } from "../../pages/Layout.jsx"

export default function LanguagesMobile() {

    const {
        language,
        languageMenuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen
    } = useContext(LayoutContext)


    let languageMenuRef = useRef()
    useEffect(() => {
        document.addEventListener(
            "mousedown",
            () => closeMenuIfClickedElsewhere(
                event, languageMenuRef, setLanguageMenuOpen
            )
        )

        return (() => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        })
    })


    return (
        <div className="Header__Languages" ref={languageMenuRef}>

            <button
                className="Header__Languagues--Button"
                onClick={() => {
                    setLanguageMenuOpen(prevOpen => !prevOpen)
                    setMenuOpen(false)
                }}
            >
                {language === "ENG" ? "ENG" : "RUS"}
            </button>

            {languageMenuOpen &&
                <ul className="Header__Languages--Menu">

                    {
                        languagesData.map(entry => (
                            <li
                                className={language === entry.langShort ? "Header__Languages--MenuItemActive" : ""}
                                onClick={() => {
                                    setLanguage(entry.langShort)
                                    setLanguageMenuOpen(false)
                                    localStorage.setItem("language", entry.langShort)
                                }}
                            >
                                {language === entry.langShort
                                    ? entry.langFullNative
                                    : entry.langFullTrans
                                }
                            </li>
                        ))
                    }

                </ul>
            }

        </div>
    )
}