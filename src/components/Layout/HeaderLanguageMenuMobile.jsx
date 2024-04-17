import { useContext } from "react"
import { LayoutContext } from "./Layout.jsx"

export default function HeaderLanguageMenuMobile() {
    const {
        language,
        languageMenuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen
    } = useContext(LayoutContext)

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
                        ? "RUS"
                        : "ENG"
                }
            </button>
            {
                languageMenuOpen &&
                <ul className="Header__Languages--Menu">
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