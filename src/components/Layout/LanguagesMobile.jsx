// general
import { useContext, useRef, useEffect } from "react"
import { nanoid } from "nanoid"
// components
import LanguagesItem from "./LanguagesItem.jsx"
// data
import { languagesData } from "../../data/layoutData.js"
// utilities
import { closeMenuIfClickedElsewhere } from "../../utilities/layoutUtilities.js"
// context
import { LayoutContext } from "../../pages/Layout.jsx"

export default function LanguagesMobile() {

    const {     // Context 1*
        language,
        languageMenuOpen,
        setLanguage,
        setLanguageMenuOpen,
        setMenuOpen
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

    function chooseLanguage(entry) {
        setLanguage(entry.langShort)
        setLanguageMenuOpen(false)
        localStorage.setItem("language", entry.langShort)
    }


    return (
        // container div
        <div className="Lang__GeneralDiv" ref={languageMenuRef}>

            {/* button */}
            <button
                className="Lang__Button"
                onClick={() => {
                    setLanguageMenuOpen(prevOpen => !prevOpen)
                    setMenuOpen(false)
                }}
            >
                {language === "ENG" ? "ENG" : "RUS"}
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
*/}