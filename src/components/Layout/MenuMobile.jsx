// general
import { nanoid } from "nanoid"
import { useContext, useRef, useEffect } from "react"
// components
import MenuItem from "./MenuItem.jsx"
// data
import { menuData } from "../../data/layoutData.js"
// utilities
import { closeMenuIfClickedElsewhere } from "../../utilities/layoutUtilities.js"
// context
import { LayoutContext } from "../../pages/Layout.jsx"
// svg
import { MdMenu } from "react-icons/md";


export default function MenuMobile() {
    const { // Context 1*
        language,
        menuOpen,
        setLanguageMenuOpen,
        setMenuOpen,
    } = useContext(LayoutContext)


    let menuRef = useRef() // Elsewhere clicks handling 2.1*
    useEffect(() => {   // Elsewhere clicks handling 2.2*
        // Listener attachment 2.2.i*
        document.addEventListener("mousedown", () => closeMenuIfClickedElsewhere(event, menuRef, setMenuOpen))
        // Cleanup 2.2.ii*
        return (() => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        })
    })

    // Active styles 3*
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

{/*

COMMENTS
1. Context
Several states & setters are imported through the LayoutContext from the Layout page.
- language: determines the UI's language as set by the user;
- menuOpen & setMenuOpen: determine if this component is shown;
- setLanguageMenuOpen: determines if the Language component is shown. It's necessary
to hide it whenever this (MenuMobile) component is shown.
.
2. Elsewhere clicks handling
If the user clicks somewhere other than this component when it's shown, the component
should be hidden right away.
2.1. menuRef is a reference that we set to the GeneralDiv of this component.
2.2. This effect contains the elsewhere clicks handling logic. The function that's
used here is closeMenuIfClickedElsewere and it's defined & explained in the utility
file "utilities/layoutUtilities".
Event's stages:
- i. Listener attachment. It's attached right to the document object. The trigger event
is "mousedown".
- ii. Cleanup. At the end of the effect's cycle the listener is removed.
.
3. Active styles
It's an object containing additional styles applied to a currently active NavLink
in the MenuItem component mapped with menuData.
*/}