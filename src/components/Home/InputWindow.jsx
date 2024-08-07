// general
import { useState, useEffect, useContext, useRef } from "react"
import { useOutletContext } from "react-router-dom"
// components
import WindowButton from "./subcomponents/WindowButton.jsx"
// context
import { TransliteratorContext } from "../../pages/Home.jsx"
// utilities
import transliterate from "../../utilities/Home/transliterate.js"
// icons
import { MdCancel } from "react-icons/md"

export default function InputWindow() {
    const {
        latestOutput,
        setActiveAlternativeOption,
        setLatestOutput,
    } = useContext(TransliteratorContext) // Context 1.1*
    const { language, vpWidth } = useOutletContext() // Context 1.2*

    const [modifiedOutput, setModifiedOutput] = useState() // States 2.1*
    useEffect(() => { // States 2.1.4*
        if (latestOutput) {
            setModifiedOutput(latestOutput.filter(char => char.modified))
        }
    }, [latestOutput])

    const [currentInput, setCurrentInput] = useState("") // State 2.2*
    function handleInputChange(event) { // State 2.2*
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value, modifiedOutput))
    }

    function clearCurrentInput() { // Clear function 3*
        setCurrentInput("")
        setLatestOutput([])
        setActiveAlternativeOption({ shown: false, char: "", initLat: "", index: null })
    }

    const [counter, setCounter] = useState(currentInput.length) // State 2.3*
    useEffect(() => { // State 2.3*
        setCounter(currentInput.length)
    }, [currentInput])

    const textAreaRef = useRef(null) // Resize effect 4*
    function resizeTextArea() {
        if (vpWidth < 450) {
            textAreaRef.current.style.height = "auto"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
        } else {
            textAreaRef.current.style.height = null
        }
    }
    useEffect(resizeTextArea, [currentInput, vpWidth]) // Resize effect 4*

    return (
        <div className="Input__GeneralDiv">

            {/* title */}
            <p className="Input__Title">
                {language === "ENG" ? "From Latin script" : "С латиницы"}
            </p>

            {/* textarea */}
            <textarea
                className="Input__Textarea"
                name="currentInput"
                id="current-input"
                placeholder={language === "ENG" ? "Enter Latin text here..." : "Введите текст латиницей здесь..."}
                value={currentInput}
                onChange={handleInputChange}
                maxLength="500"
                ref={textAreaRef}
                rows={1}
            />

            {/* character counter */}
            <div className="Input__Counter">

                {/* limit reached message */}
                {counter > 499 && <p className="Input__CounterReached">
                    {
                        language === "RUS"
                            ? "Макс. кол-во символов"
                            : "Text limit has been reached"
                    }
                </p>}

                {/* number of characters */}
                <p className={counter > 499 ? "Input__CounterReached" : ""}>
                    {counter}/500
                </p>
            </div>

            {/* clear button */}
            {currentInput &&
                <WindowButton
                    className="Input__ClearButton"
                    onClick={clearCurrentInput}
                    language={language}
                    text={{ eng: "Click to clear", rus: "Очистить" }}
                    icon={<MdCancel className="OutputWindow__CopyIcon" />}
                />
            }
        </div>
    )
}

{/*
RENDER STRUCTURE
1. Title
2. Textarea
3. Character counter
3.1. Limit reached message
3.2. Number of characters
4. Clear button

COMMENT
1. Context
1.1. TransliteratorContext
It comes from pages/Home and carries states & state setters defined there. For full info
about each of them refer to the respective file. Here are brief descriptions:
- i. modifiedOutput: I need to pass it to the "transliterate" utility as it's imporant
for several checks inside it. To learn more about the modifiedOutput state & its purpose,
refer to comments in /pages/Home;
- ii. setActiveAlterantiveOption: it's a state setter of the state containing data about
the latest clicked highlighted letter. Some letters become highlighted when the
"Alternative options" button / switch is on. In this component it's passed to the 
clearCurrentInput function that clears input, output, and the latest clicked highlighted
character;
- iii. setLatestOutput: it's a state setter of the state containing an array of objects
each representing a translisterated character. Simply put, it's the transliterated text,
the output of the transliterator. In this component it's used twice: in the
clearCurrentInput function that clears input, output, and the latest clicked highlighted
character & in the transliterate function that does the whole transliteration process. To
learn more about the transliterate function, see utilities/Home/transliterate.
.
1.2. OutletContext
It comes from pages/Layout and carries states defines there:
- i. language: a state representing the user's choice in terms of which of the 2 languages
they want to see their UI text in (English or Russian). It contains a string: "ENG" or "RUS".
By default it's "ENG";
- ii. vpWidth: a state representing the current width of the viewport (vp). It's used for
the resizing effect (see 4).

2. States
2.1. modifiedOutput
Used in: transliterate
It contains all the latestOutput's  entries with the property "modified" containing the "true" value.
Entries receive the "modified: true" property whenever they have been changed to an alternative option.
This state & the lofic related to it are very important to keep the text stable & prevent letters that
have been changed to alternative options from rolling back to initial letters. Here's what it's all about:
2.1.1. The problem
Before I had this state & its related logic, the following thing happened: letters that have beene changed
to alternative  options kept rolling back to initial letters whenever the input changed in any way: you
could just type in 1 more letter or delete 1 symbol & all the previously changed letters rolled back. Why
was that the case?
2.1.2. The flaw of utilities
2 essential utilities that consitute the transliterator logic were at fault here: transliterate (InputWindow)
& mapOutput (OutputWindow). They treated input as new at every render. That means that they started
re-mapping the input from the first character to the last one every time the input has changed. Hence the
previosly changed characters got treated like new ones since there were no records of their previous
changes stored anywhere outside the "latestOutput" state which changed every render together with the
input. That means that I needed a separate state that could register all the changes of characters & that
the 2 utilities could refer to, to restore the changed letters.
2.1.3. modifiedOutput, the referral state for letter changes
The modifiedOutput is meant to contain records of all the letters from the output that got changed (since
it's in the latestOutput where those changes took place, not in the input). Whenever the 2 main utilities
(transliterate & mapOutput) re-mapped the input & output, they now could refer to modifiedOutput to not
miss letters with the history of changes and render them the right way, keeping the output text stable.
How does modifiedOutput get its contents?
2.1.4. Filling modifiedOutput with an effect
Whenever the latestOutput state changes, a special effect triggers that checks if the latestOutput has
any entries with the "modified: true" property. It does so with the .filter method. All the entries
containing the property, are filtered inside the modifiedOutput which keeps it up to date after any
change of input & output. But how do entries actually get that "modified: true" property?
2.1.5. The "modified: true" property
Whenever you change a character to any of its alternative options, the character receives the modified
property. You can see how it happens exactly in the "utilities/Home/mapOutput".
.
2.2. currentInput
It's a controller state that controlls the input textarea. handleInputChange uses the
event.target.value to set it as the state's value and later that value is passed to the
textarea's value property. However, the handleInputChange does another important thing:
it sets the latestOutput state to the result of the transliterate function with the same
event.target.value passed to it.
.
2.3. counter
It's a state counting the number of characters in the textarea. The limit is controlled
by the textarea's property, not by the state, however. The state controlls the character
counter element's visual representation: the number before the slash (x/500) and the
message that is triggered by reaching the limit.

3. Clear function
The clear function defaults the contents of the InputWindow's textarea, OutputWindow's
output display div, and the activeAlternativeOption state which represents the latest
clicked highlighted letter.

4. Resize effect
In the mobile version the InputWindow's textarea is smaller than its maximum height at
first. If you just want to transliterate 1-2 lines, it should be enough, as you won't
have extra textarea space occupying the valuable space that the OutputWindow can have.
If you type in a lot of text into the InputWindow, it can grow. The effect handles that
auto resizing.
.
First we create a reference (textAreaRef) that we add to the textarea. Then we define
the function resizeTextArea that applies special IN-LINE styles to the referened textarea
if the width of the viewport (stored in the vpWidth state) is less than 450[px]. The
property that values are set is "height" and the values are: "auto" at first, then
the same referenced textarea's scrollHeight. Since there's a max-height set for this
element in the App.css, it won't grow along its scrollHeight forever – just before the
max-height's value has been reached.
.
If you decide to widen the viewport (the browser's window), the "else" condition can
trigger, setting the IN-LINE style of the element to "null". The in-line part is important
as in-line styles don't replace stylesheet ones. They cover them: stylesheet styles don't
disapper when in-line ones are applied. And when those in-line ones are removed, the
stylesheet styles become active again.
.
Finally, we pass the resizeTextArea function to an effect, making it trigger upon any
change in the currentInput & vpWidth states. currentInput represents the text typed in
by the user (see 2.1) so whenever they type in something or edit the text in some way,
the effect kicks in. vpWidth represents the width of the browser's window (see 1.2) and
the effect responds to any resizing of the browser's window the user does.
*/}