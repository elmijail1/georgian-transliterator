// utilities
import { NavLink } from "react-router-dom"
import { useContext } from "react"

// context
import { LayoutContext } from "./Layout.jsx"

// icon
import { MdMenu } from "react-icons/md";


export default function HeaderKebabMenuMobile() {
    const {
        language,
        menuOpen,
        setLanguageMenuOpen,
        setMenuOpen,
    } = useContext(LayoutContext)

    return (
        <div className="Header__KebabDiv">
            <button
                className="Header__Kebab"
                onClick={() => {
                    setMenuOpen(prevMenu => !prevMenu)
                    setLanguageMenuOpen(false)
                }}
            >
                <MdMenu />
            </button>

            {
                menuOpen &&
                <ul className="Header__Kebab--Menu">
                    {/* home */}
                    <li><NavLink
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                    >
                        {
                            language === "RUS"
                                ? "Главная"
                                : "Home"
                        }
                    </NavLink></li>

                    {/* knowledge */}
                    <li><NavLink
                        to="/knowledge"
                        onClick={() => setMenuOpen(false)}
                        style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                    >
                        {
                            language === "RUS"
                                ? "Полезно знать"
                                : "Knowledge"
                        }
                    </NavLink></li>

                    {/* contacts */}
                    <li><NavLink
                        to="/contacts"
                        onClick={() => setMenuOpen(false)}
                        style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                    >
                        {
                            language === "RUS"
                                ? "Контакты"
                                : "Contacts"
                        }
                    </NavLink></li>
                </ul>
            }
        </div>
    )
}