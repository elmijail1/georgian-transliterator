import { MdCancel } from "react-icons/md"
import { useState, useEffect, useContext } from "react"
import { useOutletContext } from "react-router-dom"

import { TransliteratorContext } from "../pages/Transliterator.jsx"

export default function InputWindow() {
    const {
        clearCurrentInput,
        currentInput,
        handleChange,
    } = useContext(TransliteratorContext)

    const [counter, setCounter] = useState(currentInput.length)
    useEffect(() => {
        setCounter(currentInput.length)
    }, [currentInput])

    const language = useOutletContext()

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