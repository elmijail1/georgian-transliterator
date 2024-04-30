import { nanoid } from "nanoid"
import { useState, createContext } from "react"

import { useOutletContext } from "react-router-dom"

import { charsData } from "../data/charsData"

import transliterate from "../utilities/transliterate"

import InputWindow from "../components/InputWindow"
import OutputWindow from "../components/OutputWindow"
import ExtraTools from "../components/ExtraTools"
import AlternativeOptions from "../components/AlternativeOptions"

{/*
TO DO'S:
- I. DESKTOP LAYOUT
- I.1. See what is the most common desktop layout and work on designing it
.
– II. OPTIMIZING FOR OTHER VIEWPORTS
– II.1. See what other viewports are popular and optimize both layouts for them
.
- - THIS IS WHERE I CAN SEND IT LIVE: see what free options there are (Netlify?) - -
.
– III. TRANSLATOR
– III.1. Can we use an API to get translation from Google Translate? Do it.
- III.2. If 1 is true, can we add translator as a separate page? Do it.
- III.3. If 2 is true, can we add translator to the same page? Do it.
- III.4. If 3 is true, can we rearrange our layout to make it all work well? Do it.
*/}

export const TransliteratorContext = createContext()


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
        setAlternativeOptions({ shown: false, char: "", initLat: "", index: null })
    }


    const [alternativeOptions, setAlternativeOptions] = useState({ shown: false, char: "", initLat: "", index: null })
    function showAlternativeOptions(geoChar, latInit, index) {
        // the first condition closes the alternative options upon a second click on the same char
        if (alternativeOptions.shown && alternativeOptions.index === index) {
            setAlternativeOptions(({ shown: false, geoChar: "", latInit: "", index: null }))
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

    // change the current letter to the chosen alternative option
    function useAlternativeOption(char) {
        setLatestOutput(previousOutput => {
            return (
                [
                    ...previousOutput,
                    previousOutput[alternativeOptions.index].geoChar = char
                ]
            )
        })
        setAlternativeOptions(prevOptions => ({ ...prevOptions, geoChar: char }))
    }

    const [optionsDisplay, setOptionsDisplay] = useState(false)
    // this thing activates when a button (the only button so far)
    // has been clicked in the Extra Options component. It's used
    // to highlight characters.

    const {language, vpWidth} = useOutletContext()

    const transliteratorContextContent = {
        alternativeOptions,
        charsData,
        clearCurrentInput,
        currentInput,
        handleChange,
        language,
        latestOutput,
        mapOutput,
        optionsDisplay,
        setAlternativeOptions,
        useAlternativeOption,
        setOptionsDisplay,
    }

    return (
        <TransliteratorContext.Provider value={transliteratorContextContent}>
            <main>
                <div className="TransliteratorBody">
                    <InputWindow />
                    <OutputWindow />
                </div>

                <div className="TransliteratorExtras">

                    {alternativeOptions.shown &&
                        <AlternativeOptions />
                    }

                    <ExtraTools />

                </div >
            </main>
        </TransliteratorContext.Provider>
    )
}