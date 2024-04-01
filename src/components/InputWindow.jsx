import { MdCancel } from "react-icons/md"
import { useState, useEffect } from "react"

export default function InputWindow({ value, onChange, clearCurrentInput }) {
    const [counter, setCounter] = useState(value.length)
    useEffect(() => {
        setCounter(value.length)
    }, [value])

    return (
        <div className="InputWindow">

            {/* Header */}
            <p className="InputWindow__Subtitle">From Latin script</p>

            {/* Input Textarea */}
            <textarea
                className="InputWindow__Input"
                type="text"
                name="currentInput"
                id="current-input"
                placeholder="Enter Latin text here..."
                value={value}
                onChange={onChange}
                maxLength="500"
            />

            {/* Counter */}
            <div className="InputWindow__Counter">
                {counter > 499 && <p className="InputWindow__Counter--Red">Text limit has been reached</p>}
                <p className={counter > 499 ? "InputWindow__Counter--Red" : ""}>{counter}/500</p>
            </div>

            {/* Clear Button */}
            {value &&
                <div
                    className="InputWindow__ClearDiv"
                    onClick={clearCurrentInput}
                >
                    Click to clear
                    <MdCancel className="OutputWindow__CopyIcon" />
                </div>

            }
        </div>
    )
}