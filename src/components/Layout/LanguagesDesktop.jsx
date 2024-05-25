import { useContext, useEffect, useRef } from "react"
import { LayoutContext } from "../../pages/Layout.jsx"

export default function LanguagesDesktop() {
    const {
        language,
        languageMenuOpen,
        setLanguage,
        setLanguageMenuOpen,
    } = useContext(LayoutContext)

    // these are needed to make the languageMenu close whenever you click elsewhere
    let languageMenuRef = useRef() // used to refer to the languageMenu in the render
    useEffect(() => { // adds logic for closing the languageMenu whenever clicked elsewhere
        function closeMenuIfClickedElsewhere(event) {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
                setLanguageMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", closeMenuIfClickedElsewhere)

        return () => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        }
    })

    return (
        <div className="Header__Languages" ref={languageMenuRef}>
            <button
                className="Header__Languagues--Button"
                onClick={() => {
                    setLanguageMenuOpen(prevOpen => !prevOpen)
                }}
            >
                {
                    language === "RUS"
                        ? "Русский"
                        : "English"
                }
                <span>
                    {
                        languageMenuOpen
                            ? "▲"
                            : "▼"
                    }
                </span>
            </button>
            {
                languageMenuOpen &&
                <ul
                    className="Header__Languages--Menu"
                >
                    <li
                        className={language === "ENG" ? "Header__Languages--MenuItemActive" : ""}
                        onClick={() => {
                            setLanguage("ENG")
                            setLanguageMenuOpen(false)
                            localStorage.setItem("language", "ENG")
                        }}
                    >
                        {
                            language === "RUS"
                                ? "Английский"
                                : "English"
                        }
                    </li>
                    <li
                        className={language === "RUS" ? "Header__Languages--MenuItemActive" : ""}
                        onClick={() => {
                            setLanguage("RUS")
                            setLanguageMenuOpen(false)
                            localStorage.setItem("language", "RUS")
                        }}
                    >
                        {
                            language === "RUS"
                                ? "Русский"
                                : "Russian"
                        }
                    </li>
                </ul>
            }
        </div>
    )
}