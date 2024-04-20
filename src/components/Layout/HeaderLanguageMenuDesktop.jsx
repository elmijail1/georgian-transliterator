import { useContext, useEffect, useRef } from "react"
import { LayoutContext } from "./Layout.jsx"

export default function HeaderLanguageMenuDesktop() {
    const {
        language,
        languageMenuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen
    } = useContext(LayoutContext)

    // these are needed to make the languageMenu close whenever you click elsewhere
    let menuRef = useRef() // used to refer to the languageMenu in the render
    useEffect(() => { // adds logic for closing the languageMenu whenever clicked elsewhere
        function closeMenuIfClickedElsewhere(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setLanguageMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", closeMenuIfClickedElsewhere)

        return (() => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        })
    })

    return (
        <div className="Header__Languages">
            <button
                className="Header__Languagues--Button"
                onClick={() => {
                    setLanguageMenuOpen(prevOpen => !prevOpen)
                    setMenuOpen(false)
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
                    ref={menuRef}
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