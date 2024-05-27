// general
import { useState, useEffect, useRef, createContext } from "react"
import { useOutletContext } from "react-router-dom"
// components
import InputWindow from "../components/Home/InputWindow"
import OutputWindow from "../components/Home/OutputWindow"
import AlternativeOptions from "../components/Home/AlternativeOptions"
// data
import { charsData } from "../data/charsData"

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
        letterOptionRef,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
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
1. Body (input + output)
1.1. Input window
1.2. Output window
2. Alternative Options section
*/}