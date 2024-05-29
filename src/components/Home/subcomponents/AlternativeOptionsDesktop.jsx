// general
import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
// context
import { TransliteratorContext } from "../../../pages/Home.jsx"

export default function AlternativeOptionsDesktop() {

    const { // Context 1.1*
        optionsDisplay,
        setActiveAlternativeOption,
        setOptionsDisplay,
    } = useContext(TransliteratorContext)
    const { language } = useOutletContext() // Context 1.2*

    function showAdditionalOptions() { // Switch 2*
        setOptionsDisplay(prevOptions => !prevOptions)
        setActiveAlternativeOption(({ shown: false, geoChar: "", latInit: "", index: null }))
    }

    return (
        <div className="AOD__GeneralDiv">

            {/* toggle switch */}
            <div>

                {/* checkbox-based input */}
                <input
                    type="checkbox"
                    id="AOD__SwitchCheckbox"
                    checked={optionsDisplay ? true : false}
                    onChange={showAdditionalOptions}
                />

                {/* label for switch styles */}
                <label htmlFor="AOD__SwitchCheckbox" id="AOD__SwitchLabel"></label>

            </div>


            {/* text div */}
            <div className="AOD__TextDiv">

                {/* main text */}
                <div className="AOD__MainText">
                    {
                        language === "ENG"
                            ? `${optionsDisplay ? "Hide" : "Show"} alternative options for letters`
                            : `${optionsDisplay ? "Спрятать" : "Показать"} альтернативные опции перевода букв`
                    }
                </div>

                {/* tooltip button */}
                <div className="AOD__Tooltip">

                    {/* permanently visible button text */}
                    {language === "ENG" ? "What does it mean?" : "Что это значит?"}

                    {/* on-hover visible tooltip body */}
                    <div className="AOD__TooltipText">

                        {/* description */}
                        {
                            language === "ENG"
                                ? "Press a highlighted letter to see how else it can be transliterated. Learn more about why it's important "
                                : "Нажмите на подсвеченную букву, чтобы узнать, как ещё её можно перевести. Узнайте о том, почему одну букву можно перевести по-разному, "
                        }

                        {/* link */}
                        <HashLink
                            to="/knowledge#item-5D"
                            className="AOD__TooltipLink"
                            smooth
                        >
                            {language === "ENG" ? "here" : "здесь"}
                        </HashLink>

                    </div>

                </div>

            </div>

        </div >
    )
}

{/*
RENDER STRUCTURE
1. Toggle switch
1.1. Checkbox-based input
1.2. Label for switch styles
2. Text div
2.1. Main text
2.2. Tooltip button
2.2.1. Permanently visible button text
2.2.2. On-hover visible tooltip body
2.2.2.1. Description
2.2.2.2. Link

COMMENTS
This component is only displayed when the vpWidth's value (viewpoint width defined in
pages/Layout) is above 450[px]. It contains a toggle switch (styled checkbox input)
that switches the state value of optionsDisplay and makes characters with available
alternative options highlighted. It also contains a hidden tooltip with a link to the
Knowledge page. The tooltip can be viewed by hovering the mouse over the tooltip button.

1. Context
1.1. TransliteratorContext comes from pages/Home. All these states & setters are defined
there. Here's some information about them:
- optionsDisplay: a state that defines whether characters that have available alternative
options are highlighted (to learn more about the funcionality of highlighted characters
(AKA trigger letters) visit utilities/Home/mapOutput);
- setActiveAlternativeOption: it's a state setter that affects the value of the state
activeAlternativeOption. Its value contains information about the latest clicked highlighted
character and its alternative options;
setOptionsDisplay,
- setOptionsDisplay: a state setter for optionsDisplay (see above).
1.2. OutletContext comes from pages/Layout. The language state is defined there:
- language: contains the user's preference in terms of the UI language. By default is
"ENG" (English).

2. Switch's onClick function is showAdditionaOptions. It switches optionsDisplay's value
and makes highlughted characters visible or hidden. It also resets the
activeAlternativeOption state by defaulting all its properties.
*/}