// general
import { useContext } from "react"
import { nanoid } from "nanoid"
// components
import MenuItem from "./MenuItem.jsx"
// data
import { menuData } from "../../data/layoutData.js"
// context
import { LayoutContext } from "../../pages/Layout.jsx"

export default function MenuDesktop() {

    const { language } = useContext(LayoutContext) // Context 1*

    const activeStyles = {  // Styles 2*
        fontWeight: 800,
        borderBottom: "3px solid white"
    }

    return (
        // list
        <ul className="MenuDesk__ListGeneral">
            {
                menuData.map(entry => {
                    return (

                        // list item
                        <li className="MenuDesk__ListItem" key={nanoid()}>
                            <MenuItem
                                entry={entry}
                                activeStyles={activeStyles}
                                language={language}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}

{/*
RENDER STRUCTURE
1. List
1.1. List Item
(It comes in 2 elements here since the li "MenuDesk__ListItem is required for extra
styles)

COMMENTS
1. Context
We import the state language from the Layout page to determine the language which
the texts in the menu should be in. The language is set by the user or is English
by default.
.
2. Active styles
It's an object containing additional styles applied to a currently active NavLink.
*/}