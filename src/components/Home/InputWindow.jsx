import { MdCancel } from "react-icons/md"
import { useState, useEffect, useContext, useRef } from "react"

import { TransliteratorContext } from "../../pages/Home.jsx"

import transliterate from "../../utilities/transliterate"

export default function InputWindow() {
    const {
        language,
        setActiveAlternativeOption,
        setLatestOutput,
        vpWidth,
    } = useContext(TransliteratorContext)

    const [currentInput, setCurrentInput] = useState("")

    function handleChange(event) {
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    function clearCurrentInput() {
        setCurrentInput("")
        setLatestOutput("")
        setActiveAlternativeOption({ shown: false, char: "", initLat: "", index: null })
    }

    const [counter, setCounter] = useState(currentInput.length)
    useEffect(() => {
        setCounter(currentInput.length)
    }, [currentInput])

    // dynamic height change block
    const textAreaRef = useRef(null) // DHCB

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
        <div className="InputWindow">

            {/* Header */}
            <p className="InputWindow__Subtitle">
                {
                    language === "RUS"
                        ? "С латиницы"
                        : "From Latin script"
                }
            </p>

            {/* Input Textarea */}
            <textarea
                className="InputWindow__Input"
                type="text"
                name="currentInput"
                id="current-input"
                placeholder={language === "RUS" ? "Введите текст латиницей здесь..." : "Enter Latin text here..."}
                value={currentInput}
                onChange={handleChange}
                maxLength="500"
                ref={textAreaRef}
                rows={1}
            />

            {/* Counter */}
            <div className="InputWindow__Counter">
                {counter > 499 && <p className="InputWindow__Counter--Red">
                    {
                        language === "RUS"
                            ? "Макс. кол-во символов"
                            : "Text limit has been reached"
                    }
                </p>}
                <p className={counter > 499 ? "InputWindow__Counter--Red" : ""}>{counter}/500</p>
            </div>

            {/* Clear Button */}
            {currentInput &&
                <div
                    className="InputWindow__ClearDiv"
                    onClick={clearCurrentInput}
                >
                    {
                        language === "RUS"
                            ? "Очистить"
                            : "Click to clear"
                    }

                    <MdCancel className="OutputWindow__CopyIcon" />
                </div>

            }
        </div>
    )
}