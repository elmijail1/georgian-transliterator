// general
import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
// context
import { TransliteratorContext } from "../../../pages/Home.jsx"
// icons
import { MdLightbulbOutline, MdLightbulb } from "react-icons/md";


export default function AlternativeOptionsMobile() {

    const { // Context 1.1*
        optionsDisplay,
        setActiveAlternativeOption,
        setOptionsDisplay,
    } = useContext(TransliteratorContext)
    const { language } = useOutletContext() // Context 1.2*


    const buttonClassName = `
    AOM__Button ${optionsDisplay ? "AOM__ButtonActive" : null}
    ` // Button 2.1*

    function showAdditionalOptions() { // Button 2.2*
        setOptionsDisplay(prevOptions => !prevOptions)
        setActiveAlternativeOption(({ shown: false, geoChar: "", latInit: "", index: null }))
    }

    return (
        <div className="AOM__GeneralDiv">

            {/* button */}
            <button className={buttonClassName} onClick={showAdditionalOptions}>

                {/* icon */}
                {
                    optionsDisplay
                        ? <MdLightbulb className="AOM__ButtonIconActive" />
                        : <MdLightbulbOutline className="AOM__ButtonIcon" />
                }

                {/* text */}
                <div className="AOM__ButtonText">
                    {
                        language === "ENG"
                            ? `${optionsDisplay ? "Hide" : "Show"} alternative options for letters`
                            : `${optionsDisplay ? "Спрятать" : "Показать"} альтернативные опции перевода букв`
                    }
                </div>

            </button>


            {/* description */}
            <div className="AOM__Description">

                {/* text */}
                {
                    language === "ENG"
                        ? "Press a highlighted letter to see how else it can be transliterated. Learn more about why it's important "
                        : "Нажмите на подсвеченную букву, чтобы узнать, как ещё её можно перевести. Узнайте о том, почему одну букву можно перевести по-разному, "
                }

                {/* link */}
                <HashLink
                    to="/knowledge#item-5"
                    className="AOM__DescriptionLink"
                    smooth
                >
                    {language === "ENG" ? "here" : "здесь"}
                </HashLink>

            </div>
        </div >
    )
}

{/*
RENDER STRUCTURE:
1. Button
1.1. Icon
1.2. Text
2. Description
2.1. Text
2.2. Link

COMMENTS
This component is only displayed when the vpWidth's value (viewpoint width defined in
pages/Layout) is below 450[px]. It contains a button that switches the state value of
optionsDisplay and makes characters with available alternative options highlighted.

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

2. Button
2.1. buttonClassName: a string containing this component button's class names. The class
that is constantly present is "AOM__Button". The other class ("AOM__ButtonActive") is
conditional and is only present when optionsDisplay is "true".
2.2. showAdditionaOptions: switches optionsDisplay's value and makes highlughted characters
visible or hidden. It also resets the activeAlternativeOption state by defaulting all its
properties.
*/}