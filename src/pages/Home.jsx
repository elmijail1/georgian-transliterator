// general
import { useState, createContext, useEffect } from "react"
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
    
    const [modifiedOutput, setModifiedOutput] = useState() // States 1.4*
    useEffect(() => { // States 1.4.4*
        if (latestOutput) {
            setModifiedOutput(latestOutput.filter(char => char.modified))
            console.log(modifiedOutput)
        }
    }, [latestOutput])


    const transliteratorContextContent = { // Context 2*
        activeAlternativeOption,
        latestOutput,
        modifiedOutput,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
        setModifiedOutput,
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
1.4. modifiedOutput
Used in: InputWindow (& its utility transliterate), OutputWindow (& its utility mapOutput)
It contains all the latestOutput's  entries with the property "modified" containing the "true" value.
Entries receive the "modified: true" property whenever they have been changed to an alternative option.
This state & the lofic related to it are very important to keep the text stable & prevent letters that
have been changed to alternative options from rolling back to initial letters. Here's what it's all about:
1.4.1. The problem
Before I had this state & its related logic, the following thing happened: letters that have beene changed
to alternative  options kept rolling back to initial letters whenever the input changed in any way: you
could just type in 1 more letter or delete 1 symbol & all the previously changed letters rolled back. Why
was that the case?
1.4.2. The flaw of utilities
2 essential utilities that consitute the transliterator logic were at fault here: transliterate (InputWindow)
& mapOutput (OutputWindow). They treated input as new at every render. That means that they started
re-mapping the input from the first character to the last one every time the input has changed. Hence the
previosly changed characters got treated like new ones since there were no records of their previous
changes stored anywhere outside the "latestOutput" state which changed every render together with the
input. That means that I needed a separate state that could register all the changes of characters & that
the 2 utilities could refer to, to restore the changed letters.
1.4.3. modifiedOutput, the referral state for letter changes
The modifiedOutput is meant to contain records of all the letters from the output that got changed (since
it's in the latestOutput where those changes took place, not in the input). Whenever the 2 main utilities
(transliterate & mapOutput) re-mapped the input & output, they now could refer to modifiedOutput to not
miss letters with the history of changes and render them the right way, keeping the output text stable.
How does modifiedOutput get its contents?
1.4.4. Filling modifiedOutput with an effect
Whenever the latestOutput state changes, a special effect triggers that checks if the latestOutput has
any entries with the "modified: true" property. It does so with the .filter method. All the entries
containing the property, are filtered inside the modifiedOutput which keeps it up to date after any
change of input & output. But how do entries actually get that "modified: true" property?
1.4.5. The "modified: true" property
Whenever you change a character to any of its alternative options, the character receives the modified
property. You can see how it happens exactly in the "utilities/Home/mapOutput".


.
.
2. Context
All the 3 states & its setters declared here are passed to the context.
*/}