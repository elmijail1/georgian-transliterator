// general
import { nanoid } from "nanoid"
import { useContext, useRef, useEffect } from "react"
// components
import MenuItem from "./MenuItem.jsx"
// data
import { menuData } from "../../data/layoutData.js"
// context
import { LayoutContext } from "../../pages/Layout.jsx"
// svg
import { MdMenu } from "react-icons/md";


export default function MenuMobile() {
    const {
        language,
        menuOpen,
        setLanguageMenuOpen,
        setMenuOpen,
    } = useContext(LayoutContext)


    let menuRef = useRef() // these 2 are used to make the kebab menu close when clicked elsewhere; ref refers to the menu element in the render
    useEffect(() => { // adds logic for closing the languageMenu whenever clicked elsewhere
        function closeMenuIfClickedElsewhere(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", closeMenuIfClickedElsewhere)

        return (() => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        })
    })

    const activeStyles = { fontWeight: 700 }

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
                <div className="Header__Kebab--Menu">

                    {
                        menuData.map(entry => {
                            return (
                                <MenuItem
                                    entry={entry}
                                    activeStyles={activeStyles}
                                    language={language}
                                    onClick={() => setMenuOpen(false)}
                                    key={nanoid()}
                                />
                            )
                        })
                    }

                </div>
            }
        </div>
    )
}