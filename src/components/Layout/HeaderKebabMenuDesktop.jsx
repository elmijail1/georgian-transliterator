// utilities
import { NavLink } from "react-router-dom"
import { useContext } from "react"

// context
import { LayoutContext } from "./Layout.jsx"

// icon
import { MdMenu } from "react-icons/md";

export default function HeaderKebabMenuDesktop() {
    const {
        language,
        menuOpen,
        setLanguageMenuOpen,
        setMenuOpen,
    } = useContext(LayoutContext)

    return (
        <div className="Header__KebabDiv">
            <ul className="Header__DesktopMenu">
                {/* home */}

                <li
                    onClick={() => setMenuOpen(false)}
                    className="Header__DesktopMenu__ListItem"
                >
                    <NavLink
                        to="/"
                        style={({ isActive }) => isActive ? { fontWeight: 800, borderBottom: "3px solid white" } : null}
                    >
                        {
                            language === "RUS"
                                ? "Главная"
                                : "Home"
                        }
                    </NavLink>
                </li>

                {/* knowledge */}
                <li
                    onClick={() => setMenuOpen(false)}
                    className="Header__DesktopMenu__ListItem"
                >
                    <NavLink
                        to="/knowledge"
                        onClick={() => setMenuOpen(false)}
                        style={({ isActive }) => isActive ? { fontWeight: 800, borderBottom: "3px solid white" } : null}
                    >
                        {
                            language === "RUS"
                                ? "Полезно знать"
                                : "Knowledge"
                        }
                    </NavLink>
                </li>

                {/* contacts */}
                <li
                    onClick={() => setMenuOpen(false)}
                    className="Header__DesktopMenu__ListItem"
                >
                    <NavLink
                        to="/contacts"
                        onClick={() => setMenuOpen(false)}
                        style={({ isActive }) => isActive ? { fontWeight: 800, borderBottom: "3px solid white" } : null}
                    >
                        {
                            language === "RUS"
                                ? "Контакты"
                                : "Contacts"
                        }
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}