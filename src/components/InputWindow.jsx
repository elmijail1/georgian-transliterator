import { MdCancel } from "react-icons/md"
import { useState, useEffect } from "react"
import { useOutletContext } from "react-router-dom"

export default function InputWindow({ value, onChange, clearCurrentInput }) {
    const [counter, setCounter] = useState(value.length)
    useEffect(() => {
        setCounter(value.length)
    }, [value])

    const language = useOutletContext()

    return (
        <div className="InputWindow">

            {/* Header */}
            <p className="InputWindow__Subtitle">
                {
                    language === "RU"
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
                placeholder={language === "RU" ? "Введите текст латиницей здесь..." : "Enter Latin text here..."}
                value={value}
                onChange={onChange}
                maxLength="500"
            />

            {/* Counter */}
            <div className="InputWindow__Counter">
                {counter > 499 && <p className="InputWindow__Counter--Red">
                    {
                        language === "RU"
                        ? "Макс. кол-во символов"
                        : "Text limit has been reached"
                    }
                    </p>}
                <p className={counter > 499 ? "InputWindow__Counter--Red" : ""}>{counter}/500</p>
            </div>

            {/* Clear Button */}
            {value &&
                <div
                    className="InputWindow__ClearDiv"
                    onClick={clearCurrentInput}
                >
                    {
                        language === "RU"
                        ? "Очистить"
                        : "Click to clear"
                    }
                    
                    <MdCancel className="OutputWindow__CopyIcon" />
                </div>

            }
        </div>
    )
}