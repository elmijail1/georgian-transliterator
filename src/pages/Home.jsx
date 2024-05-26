// general
import { nanoid } from "nanoid"
import { useState, useEffect, useRef, createContext } from "react"
import { useOutletContext } from "react-router-dom"
// components
import InputWindow from "../components/Home/InputWindow"
import OutputWindow from "../components/Home/OutputWindow"
import AlternativeOptions from "../components/Home/AlternativeOptions"
// data
import { charsData } from "../data/charsData"
// utilities
import transliterate from "../utilities/transliterate"

export const TransliteratorContext = createContext()

export default function Home() {

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

    function determineIfDekstopLetterOptionsShouldBeShown(charIndex) {
        if (alternativeOptions.shown && alternativeOptions.index === charIndex) {
            return true
        }
    }

    
    let letterOptionRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            if (letterOptionRef.current && !letterOptionRef.current.contains(e.target)) {
                setAlternativeOptions({ shown: false, char: "", initLat: "", index: null })
            }
        }
        
        document.addEventListener("mousedown", handler)
        
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    function mapOutput() {
        const triggerLetters = ["t", "y", "p", "h", "k", "ts", "ch", "c", "w", "x"]
        if (optionsDisplay) {
            return latestOutput.map((entry, index) => {
                if (triggerLetters.includes(entry.latInit)) {
                    return (
                        <span
                            className={`highlighterLetter ${alternativeOptions.index === index && "highlighterLetter--pressed"}`}
                            key={nanoid()}
                            id={`letter-${index}`}
                            onClick={() => {
                                // document.getElementById(`letter-${index}`).focus()
                                showAlternativeOptions(entry.geoChar, entry.latInit, index)
                            }}
                        >
                            {entry.geoChar}
                            {
                                determineIfDekstopLetterOptionsShouldBeShown(index) &&
                                <span
                                    className="aoDesktop__LetterOptions"
                                    ref={letterOptionRef}
                                >
                                    {
                                        charsData.filter((char) => char.lat === alternativeOptions.latInit)[0].options.map((char) => {
                                            if (char !== alternativeOptions.geoChar) {
                                                return (
                                                    <div
                                                        key={nanoid()}
                                                        className="aoDesktop__LetterOptions__Letter"
                                                        onClick={() => useAlternativeOption(char)}
                                                    >
                                                        {char}
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </span>
                            }
                        </span>
                    )

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

    const { language, vpWidth } = useOutletContext()

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
        useAlternativeOption,
        setAlternativeOptions,
        setCurrentInput,
        setOptionsDisplay,
        vpWidth,
    }

    return (
        <TransliteratorContext.Provider value={transliteratorContextContent}>
            <main>

                <div className="TransliteratorBody">
                    <InputWindow />
                    <OutputWindow />
                </div>

                <AlternativeOptions />

            </main>
        </TransliteratorContext.Provider>
    )
}

{/*
RENDER STRUCTURE
0. Layout [see Layout page]
1. Input window
2. Output window
3. Alternative Options section
*/}