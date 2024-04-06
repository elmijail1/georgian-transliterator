import { nanoid } from "nanoid"
import { useState } from "react"

import { charsData } from "../data/charsData"

import transliterate from "../utilities/transliterate"

import InputWindow from "../components/InputWindow"
import OutputWindow from "../components/OutputWindow"
import ExtraTools from "../components/ExtraTools"

{/*
TO DO'S:
– I. ALTERNATIVE OPTIONS
- I.1. Add on-hover info for highlighted letters
- I.2. Can we make that on-hover interactive so that we could change letters via it?
- I.3. Add description of the issue with letter options as a separate page (Knowledge)
- I.4. Add link to it to the header
.
– II. RUSSIAN LANGUAGE SUPPORT
- II.1. Add a togler that would change Eng text to Russian
- II.2. Add the Russian version of most texts
.
- III. DESKTOP LAYOUT
- III.1. See what is the most common desktop layout and work on designing it
.
– IV. OPTIMIZING FOR OTHER VIEWPORTS
– IV.1. See what other viewports are popular and optimize both layouts for them
.
- - THIS IS WHERE I CAN SEND IT LIVE: see what free options there are (Netlify?) - -
.
– V. TRANSLATOR
– V.1. Can we use an API to get translation from Google Translate? Do it.
- V.2. If 1 is true, can we add translator as a separate page? Do it.
- V.3. If 2 is true, can we add translator to the same page? Do it.
- V.4. If 3 is true, can we rearrange our layout to make it all work well? Do it.
*/}


export default function Transliterator() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    const [latestOutput, setLatestOutput] = useState("")

    function clearCurrentInput() {
        setCurrentInput("")
        setLatestOutput("")
    }


    const [alternativeOptions, setAlternativeOptions] = useState({ shown: false, char: "", initLat: "", index: null })
    function showAlternativeOptions(geoChar, latInit, index) {
        // the first condition closes the alternative options upon a second click on the same char
        if (alternativeOptions.shown && alternativeOptions.index === index) {
            setAlternativeOptions(prevOptions => ({ shown: false, geoChar: "", latInit: "", index: null }))
        // this condition shows alternative options the regular way upon the first click on a char
        } else {
            setAlternativeOptions({ shown: true, geoChar: geoChar, latInit: latInit, index: index })
        }
    }

    function mapOutput() {
        const triggerLetters = ["t", "y", "p", "h", "k", "ts", "ch"]
        if (optionsDisplay) {
            return latestOutput.map((entry, index) => {
                if (triggerLetters.includes(entry.latInit)) {
                    return <span
                        className={`highlighterLetter ${alternativeOptions.index === index && "highlighterLetter--pressed"}`}
                        key={nanoid()}
                        onClick={() => showAlternativeOptions(entry.geoChar, entry.latInit, index)}
                    >
                        {entry.geoChar}
                    </span>
                } else {
                    return <span key={nanoid()}>{entry.geoChar}</span>
                }
            })
        } else {
            const outputArray = []
            latestOutput.map(entry => {
                outputArray.push(entry.geoChar)
            })
            return outputArray.join("")
        }
    }

    const [optionsDisplay, setOptionsDisplay] = useState(false)
    // this thing activates when a button (the only button so far)
    // has been clicked in the Extra Options component. It's used
    // to highlight characters.

    return (
        <div>
            <InputWindow
                value={currentInput}
                onChange={handleChange}
                clearCurrentInput={clearCurrentInput}
            />

            <OutputWindow
                value={latestOutput}
                mapOutput={mapOutput}
            />

            {alternativeOptions.shown && <div className="AlternativeOptions__Div">
                <p className="AlternativeOptions__Subtitle">Alternative options</p>
                <p>
                    Other ways to transliterate this character
                    (you can click a suggested character to
                    replace the current one with it)
                </p>
                <div className="AlternativeOptions__CharDisplay">
                    {
                        charsData.filter((char) => char.lat === alternativeOptions.latInit)[0].options.map((char) => {
                            return (
                                <div
                                    className="AlternativeOptions__SingleChar"
                                    key={nanoid()}
                                >
                                    {char}
                                </div>
                            )
                        })
                    }
                </div>
            </div>}

            <ExtraTools
                optionsDisplay={optionsDisplay}
                setOptionsDisplay={setOptionsDisplay}
            />

        </div>
    )
}