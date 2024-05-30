// general
import { useState, useEffect, useContext, useRef } from "react"
import { useOutletContext } from "react-router-dom"
// components
import WindowButton from "./subcomponents/WindowButton.jsx"
// context
import { TransliteratorContext } from "../../pages/Home.jsx"
// utilities
import transliterate from "../../utilities/transliterate"
// icons
import { MdCancel } from "react-icons/md"

export default function InputWindow() {
    const {
        setActiveAlternativeOption,
        setLatestOutput,
    } = useContext(TransliteratorContext) // Context 1.1*
    const { language, vpWidth } = useOutletContext() // Context 1.2*

    const [currentInput, setCurrentInput] = useState("") // State 2.1*
    function handleInputChange(event) { // State 2.1*
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    function clearCurrentInput() { // Clear function 3*
        setCurrentInput("")
        setLatestOutput("")
        setActiveAlternativeOption({ shown: false, char: "", initLat: "", index: null })
    }

    const [counter, setCounter] = useState(currentInput.length) // State 2.2*
    useEffect(() => { // State 2.2*
        setCounter(currentInput.length)
    }, [currentInput])

    // dynamic height change block
    const textAreaRef = useRef(null) // DHCB // Resize effect 4*
    function resizeTextArea() { // DHCB
        if (vpWidth < 450) {
            textAreaRef.current.style.height = "auto"
            textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"
        } else {
            textAreaRef.current.style.height = null
        }
    }
    useEffect(resizeTextArea, [currentInput, vpWidth]) // DHCB

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
.
1.2. OutletCountext

2. States
2.1. currentInput
.
2.2. counter

3. Clear function

4. Resize effect
*/}