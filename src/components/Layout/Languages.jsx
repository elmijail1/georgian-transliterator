// general
import { useContext, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
// components
import LanguagesItem from "./LanguagesItem.jsx"
// data
import { languagesData } from "../../data/layoutData.js"
// utilities
import { closeMenuIfClickedElsewhere } from "../../utilities/Layout/layoutUtilities.js"
// context
import { LayoutContext } from "../../pages/Layout.jsx"

export default function Languages() {

    const {     // Context 1*
        language,
        languageMenuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen,
        vpWidth,
    } = useContext(LayoutContext)


    let languageMenuRef = useRef() // Elsewhere clicks handling 2.1*
    useEffect(() => {      // Elsewhere clicks handling 2.2*
        // Listener attachment 2.2.i*
        document.addEventListener(
            "mousedown",
            () => closeMenuIfClickedElsewhere(
                event, languageMenuRef, setLanguageMenuOpen
            )
        )
        // Cleanup 2.2.ii*
        return (() => {
            document.removeEventListener("mousedown", closeMenuIfClickedElsewhere)
        })
    })

    function chooseLanguage(entry) { // Option click handling 3*
        setLanguage(entry.langShort)
        setLanguageMenuOpen(false)
        localStorage.setItem("language", entry.langShort)
    }

    function clickOnMenuButton() { // Menu button click handling 4*
        setLanguageMenuOpen(prevOpen => !prevOpen)
        vpWidth > 999 && setMenuOpen(false)
    }

    function determineButtonText() { // Menu button text dermination 5.1*
        if (vpWidth > 999) {
            if (language === "ENG") {
                return "English"
            } else {
                return "Русский"
            }
        } else {
            if (language === "ENG") {
                return "ENG"
            } else {
                return "RUS"
            }
        }
    }

    function determineButtonSpan() { // Menu button text dermination 5.2*
        if (vpWidth > 999) {
            if (languageMenuOpen) {
                return <span>▲</span>
            } else {
                return <span>▼</span>
            }
        }
    }


    return (
        // container div
        <div className="Lang__GeneralDiv" ref={languageMenuRef}>

            {/* button */}
            <button
                className="Lang__Button"
                onClick={clickOnMenuButton}
            >
                {determineButtonText()} {determineButtonSpan()}
            </button>

            {/* list */}
            {languageMenuOpen &&
                <ul className="Lang__Menu">

                    {
                        languagesData.map(entry => (
                            // list item
                            <LanguagesItem
                                entry={entry}
                                language={language}
                                chooseLanguage={chooseLanguage}
                                key={nanoid()}
                            />
                        ))
                    }

                </ul>
            }

        </div>
    )
}

{/*
RENDER STRUCTURE
1. Component div
1.1. Button (determines if the List (1.2) is shown or hidden)
1.2. List
1.2.1. List item

COMMENTS
1. Context
Several states & setters are imported through the LayoutContext from the Layout page.
- language & setLanguage: determines the UI's language as set by the user;
- languageMenuOpen & setLanguageMenuOpen: determine if this component is shown;
- setMenuOpen: determines if the Menu (Mobile or Desktop) component is shown. It's
necessary to hide it whenever this (Languages) component is shown.
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
3. Option click handling
Whenever an option (LanguagesItem) is clicked, 3 things happen:
- the language state's value is set to the respective clicked option and the UI's
language changes to it;
- this component (LanguagesMobile) gets hidden;
- the clicked value is saved to the local storage so that the user will have the
same language setting upon rerendering or reload.
.
4. Menu button click handling
It changes the value of the languageMenuOpen state to the opposite (true / false).
If the width of the viewport (represented by the state vpWidth) is above 999, which
means that what the user currently sees is the desktop version, the menuOpen state
is not changed since it's not relevant in the desktop version.
.
5. Menu button text determnation
The menu button can consist from 1 or 2 parts. 2 functions determine the result:
5.1. The text is always present. However, in the mobile version a shortened version
of it is used (ENG / RUS), while in the desktop version (vpWidth > 999), the full
version is used (English / Русский).
5.2. The arrow is only present in the desktop version (vpWidth > 999). It looks down
when the languageMenuOpen state is false and it looks up when it's true.
*/}