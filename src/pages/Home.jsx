// general
import { useState, createContext } from "react"
// components
import InputWindow from "../components/Home/InputWindow"
import OutputWindow from "../components/Home/OutputWindow"
import AlternativeOptions from "../components/Home/AlternativeOptions"

export const TransliteratorContext = createContext() // Context 2*

export default function Home() {

    const [latestOutput, setLatestOutput] = useState("") // States 1.1*
    const [activeAlternativeOption, setActiveAlternativeOption] = useState( //States 1.2*
        { shown: false, char: "", initLat: "", index: null }
    )
    const [optionsDisplay, setOptionsDisplay] = useState(false) // States 1.3*

    const transliteratorContextContent = { // Context 2*
        activeAlternativeOption,
        latestOutput,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
        setOptionsDisplay,
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


COMMENTS
1. States
1.1. latestOutput
Used in: OutputWindow, InputWindow
Info: It's what gets displayed in the OutputWindow. We need it here to pass it to
InputWindow for its "Clear" button funcitonality: upon clearing the InputWindow's
contents it also clears the contents of the OutputWindow (with setLatestOutput).
Since those 2 window components are siblings we can't pass the state between them,
hence it's necessary to initialize it in their closest mutual parent.
.
1.2. activeAlternativeOption
Used in: AlternativeOptions (& its children), InputWindow, OutputWindow
Info: It displays the latest clicked highlighted character & its alternative
options. Its setter is often used when it's necessary to dehighlight the character.
.
1.3. optionsDisplay
Used in: AlternativeOptions (& its children), OutputWindow
It activates character highlighting. Clicking a highlighted character makes its
alternative options visible (see 1.2).
.
.
2. Context
All the 3 states & its setters declared here are passed to the context.
*/}