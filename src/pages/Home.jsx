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
import { showAlternativeOptions, determineIfOptionsShouldBeShown, useAlternativeOption } from "../utilities/Home/mapOutput"

export const TransliteratorContext = createContext()

export default function Home() {

    const [latestOutput, setLatestOutput] = useState("")

    const [activeAlternativeOption, setActiveAlternativeOption] = useState(
        { shown: false, char: "", initLat: "", index: null }
    )


    let letterOptionRef = useRef() // Effects 3.1*
    useEffect(() => { // Effects 3.1*
        let handler = (e) => {
            if (letterOptionRef.current && !letterOptionRef.current.contains(e.target)) {
                setActiveAlternativeOption({ shown: false, char: "", initLat: "", index: null })
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    function mapOutput() { // MOVE TO utilities/Home/mapOutput
        // args: optionsDisplay, latestOutput, activeAlternativeOption, setActiveAlternativeOption, nanoid, charsData, letterOptionsRef (what am I supposed to do with it, I wonder)
        // subfunctions: showAlternativeOptions, determineIfDesktop..., useAlternativeOption
        const triggerLetters = ["t", "y", "p", "h", "k", "ts", "ch", "c", "w", "x"]
        if (optionsDisplay) {
            return latestOutput.map((entry, index) => {
                if (triggerLetters.includes(entry.latInit)) {
                    return (
                        <span
                            className={`highlighterLetter ${activeAlternativeOption.index === index && "highlighterLetter--pressed"}`}
                            key={nanoid()}
                            id={`letter-${index}`}
                            onClick={() => {
                                showAlternativeOptions(entry, index, activeAlternativeOption, setActiveAlternativeOption)
                            }}
                        >
                            {entry.geoChar}
                            {
                                determineIfOptionsShouldBeShown(index, activeAlternativeOption) &&
                                <span
                                    className="aoDesktop__LetterOptions"
                                    ref={letterOptionRef}
                                >
                                    {
                                        charsData.filter((char) => char.lat === activeAlternativeOption.latInit)[0].options.map((char) => {
                                            if (char !== activeAlternativeOption.geoChar) {
                                                return (
                                                    <div
                                                        key={nanoid()}
                                                        className="aoDesktop__LetterOptions__Letter"
                                                        onClick={() => useAlternativeOption(char, setLatestOutput, activeAlternativeOption, setActiveAlternativeOption)}
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

    const [optionsDisplay, setOptionsDisplay] = useState(false)
    // this thing activates when a button (the only button so far)
    // has been clicked in the Extra Options component. It's used
    // to highlight characters.

    const { language, vpWidth } = useOutletContext()

    const transliteratorContextContent = {
        activeAlternativeOption,
        charsData,
        language,
        latestOutput,
        mapOutput,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
        setOptionsDisplay,
        useAlternativeOption,
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
1. Body (input + output)
1.1. Input window
1.2. Output window
2. Alternative Options section
*/}