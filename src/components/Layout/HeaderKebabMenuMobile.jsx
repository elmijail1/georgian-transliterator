// utilities
import { NavLink } from "react-router-dom"
import { useContext, useRef, useEffect } from "react"

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


    let menuRef = useRef() // these 2 are used to make the kebab menu close when clicked elsewhere; ref refers to the menu element in the render
    useEffect(() => { // adds logic for closing the languageMenu whenever clicked elsewhere
        function closeMenuIfClickedElsewhere (event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", closeMenuIfClickedElsewhere)

        return(() => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        })
    })

    return (
        <div className="Header__KebabDiv" ref={menuRef}>
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