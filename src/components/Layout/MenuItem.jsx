// general
import { NavLink } from "react-router-dom"

export default function MenuItem({entry, activeStyles, language}) {
    return (
        <NavLink
            to={entry.path}
            style={({ isActive }) => isActive ? activeStyles : null}
        >
            {language === "ENG" ? entry.textEng : entry.textRus}
        </NavLink>
    )
}

{/*
COMMENTS
This component renders a navigation link. Things of interest:
- language: determines the language of the text. Its value comes from the state
"language" set by the user. You can find the state declaration as well as dedicated
comments in the Layout page.
- style: isActive is a special object belonging to NavLink components that determines
if the current location (path) is identical to that of NavLink. If it is, the NavLink
can accept additional styles.
*/}