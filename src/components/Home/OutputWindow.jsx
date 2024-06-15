// general
import { useContext, useRef, useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"
// components
import WindowButton from "./subcomponents/WindowButton.jsx"
// data
import { charsData } from "../../data/charsData.js"
// context
import { TransliteratorContext } from "../../pages/Home.jsx"
// utilities
import { mapOutput } from "../../utilities/Home/mapOutput.jsx"
import { useElsewhereClick } from "../../utilities/useElsewhereClick.js"
// icons
import { MdContentCopy } from "react-icons/md";

export default function OutputWindow() {

    // to dos
    // - modifiedOutput
// - output (latestOutput) now has the modified parameter
// - transliterate
// ..- digraphCount
// - useEffect that updates modifiedOutput each time output (latestOutput) changes

    const {
        activeAlternativeOption,
        latestOutput,
        modifiedOutput,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
        setModifiedOutput,
    } = useContext(TransliteratorContext) // Context 1.1*

    const { language } = useOutletContext() // Context 1.2*

    // // MAP-OUTPUT-TEST IMPORTANT
    // const [modifiedOutput, setModifiedOutput] = useState()
    // useEffect(() => {
    //     if (latestOutput) {
    //         setModifiedOutput(latestOutput.filter(char => char.modified))
    //         console.log(modifiedOutput)
    //     }
    // }, [latestOutput])

    let letterOptionRef = useRef() // Effect 2*
    function clickOffSuggestedOptions(event) { // Effect 2*
        if (!letterOptionRef.current?.contains(event.target) && !event.target.className?.includes("TriggerLetter")) {
            setActiveAlternativeOption({ shown: false, char: "", initLat: "", index: null })
        }
    }
    useElsewhereClick(() => clickOffSuggestedOptions(event)) // Effect 2*

    function copyToClipboardLatestOutput() { // Functions 3.1*
        const arrayToCopy = []
        latestOutput.map(entry => arrayToCopy.push(entry.geoChar))
        navigator.clipboard.writeText(arrayToCopy.join(""))
    }

    const mapOutputArguments = { // Functions 3.2*
        optionsDisplay,
        latestOutput,
        activeAlternativeOption,
        setActiveAlternativeOption,
        charsData,
        letterOptionRef,
        setLatestOutput,
    }

    return (
        <div className="Output__GeneralDiv">

            {/* title */}
            <p className="Output__Title">
                {language === "ENG" ? "To Georgian script" : "На грузинский шрифт"}
            </p>


            {/* output display */}
            <div className="Output__TextDisplay">
                {latestOutput.length
                    ? mapOutput(mapOutputArguments)
                    :
                    <span className="Output__Placeholder">
                        {language === "ENG"
                            ? "...to see Georgian text here!"
                            : "...и получите грузинский текст здесь!"
                        }
                    </span>}
            </div>

            {/* copy button */}
            {latestOutput &&
                <WindowButton
                    className="Output__CopyButton"
                    onClick={copyToClipboardLatestOutput}
                    language={language}
                    text={{ eng: "Click to copy", rus: "Копировать" }}
                    icon={<MdContentCopy className="Output__CopyIcon" />}
                />
            }

        </div>
    )
}

{/*
RENDER STRUCTURE
1. Title
2. Output display
2.1. mapOutput's return / placeholder
3. Copy button

COMMENTS
This component displays the result of the translieration – i.e. the text typed in by
the user turned into the Georgian script from the Latin one. Technically speaking, this
component is meant for displaying the result of the mapOutput function. To learn more
about mapOutput refer to utilities/Home/mapOutput.

1. Context
1.1. TransliteratorContext
It comes from pages/Home and carries states & state setters defined there. For full info
about each of them refer to the respective file. Here are brief descriptions:
- i. activeAlterantiveOption: the state containing data about the latest clicked highlighted
letter. Some letters become highlighted when the "Alternative options" button / switch
is on. In this component it's passed to the mapOutput function. Learn more about how it's
used in it in utilities/Home/mapOutput;
- ii. latestOutput: the state containing an array of objects each representing a
transliterated character (to learn more about transliteration refer to
utilities/Home/transliterate & components/Home/InputWindow). In this component it's passed
to the mapOutput function and used for copying the output to the clipboard (see 3.1);
- iii. optionsDisplay: the state containing a boolean that represents whether additional
options are shown (i.e. if letters that have such available options are highlighted).
In this component it's passed to the mapOutput function;
- iv. setActiveAlternativeOption: a state setter for i.;
- v. setLatestOutout: a state setter for ii..
.
1.2. OutletContext
It comes from pages/Layout and carries the language state that represents the user's
choice in terms of which of the 2 languages they want to see their UI text in (English
or Russian). It contains a string: "ENG" or "RUS". By default it's "ENG".

2. Effect
The useElsewhereClick effect handles clicks off the additional options list. When additional
options are turned on and a highlighted letter is clicked, the user is also shown a list
of options available for that same letter. If they click one of the suggested options, the
highlighted letters changes to the clicked suggested letter. But what happens if they click
elsewhere? This effect handles that.
.
In brief, it accepts a function that does what you want to happen on the off-click, attaches
it to the document as an event listener, and then removes it. You can learn more about it
in utilities/useElsewhereClick.
.
The function we pass to that hook (clickOffSuggestedOptions) checks the clicked element
(event.target) for 2 things:
- whether the letterOptionRef reference contains in. It's the reference that we've set
for the TriggerLetter__Options (the list of options that appears upon clicking on a
highlighted character). We add "?" after current in the condition definition to imply
that the letterOptionRef has "current". If it doesn't, the condition won't work but it
won't throw an error either;
- whether the event.target has a className and, if it does, whether it includes the class
"TriggerLetter". That is, if the element that we click is a TriggerLetter. We need this
condition to make clicking on other TriggerLetters open their option menus right away
instead of just closing the currently opened one. So if you click on a highlighted
character and then click elsewhere with its menu open, the menu will just close. If you
click on another highlighted letter, however, the respective optio menu will open while
the one that's been open for the latest clicked character will close.


3. Functions
3.1. copyToClipboardLatestOutput
It lets the user copy the output text. It's a bit tricky however. The latestOutput state
contains an array of objects, so we need to map it first into another array to get a simple
array of characters (strings) to later join.
.
3.2. mapOutputArguments
To make the render part easier to read I've collected all the arguments the mapOutput
function needs above it. To learn more about why the function needs all those arguments,
refer to utilities/Home/mapOutput.
*/}