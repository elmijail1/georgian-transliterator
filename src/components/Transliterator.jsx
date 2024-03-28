import { nanoid } from "nanoid"
import { useState, useEffect } from "react"

import { MdCancel, MdContentCopy } from "react-icons/md";

import transliterate from "../utilities/transliterate"

{/*
TO DO'S:
- 1. how to suggest alternative options?
- 2. how to keep line breaks?

*/}


export default function Transliterator() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    const [latestOutput, setLatestOutput] = useState("")

    const [counter, setCounter] = useState(currentInput.length)
    useEffect(() => {
        setCounter(currentInput.length)
    }, [currentInput])

    function clearCurrentInput() {
        setCurrentInput("")
        setLatestOutput("")
    }

    function copyToClipboardLatestOutput() {
        navigator.clipboard.writeText(latestOutput)
    }

    return (
        <div>
            <div className="Header">
                <div className="Header__Logo">
                    <span className="Header__Logo--tlat">t</span>
                    <span className="Header__Logo--slash">⃕</span>
                    <span className="Header__Logo--tgeo">თ</span>
                </div>
                <p className="Header__Title">Georgian Transliterator</p>
            </div>

            <div className="InputWindow">
                <p className="InputWindow__Subtitle">From Latin script</p>
                <textarea
                    className="InputWindow__Input"
                    type="text"
                    name="currentInput"
                    id="current-input"
                    placeholder="Enter Latin text here..."
                    value={currentInput}
                    onChange={handleChange}
                    maxLength="500"
                />
                <div className="InputWindow__Counter">
                    {counter > 499 && <p className="InputWindow__Counter--Red">Text limit has been reached</p>}
                    <p className={counter > 499 ? "InputWindow__Counter--Red" : ""}>{counter}/500</p>
                </div>
                {currentInput &&
                    <div
                        className="InputWindow__ClearDiv"
                        onClick={clearCurrentInput}
                    >
                        Click to clear
                        <MdCancel className="OutputWindow__CopyIcon" />
                    </div>
                }
            </div>

            <div className="OutputWindow">
                <p className="OutputWindow__Subtitle">To Georgian script</p>
                <div className="OutputWindow__Display">
                    {latestOutput ? latestOutput :
                        <span className="OuputWindow__PlaceholderText">
                            ...to see Georgian text here!
                        </span>}
                </div>
                {latestOutput &&
                    <div
                        className="OutputWindow__CopyDiv"
                        onClick={copyToClipboardLatestOutput}
                    >
                        Click to copy
                        <MdContentCopy className="OutputWindow__CopyIcon" />
                    </div>}
            </div>

            {/* <h2>Saved history:</h2>
            {history &&
                <ul>
                    {
                        history.slice(0).reverse().map((item) => {
                            return (
                                <li key={nanoid()}>{item.geoItem} ← {item.latItem}</li>
                            )
                        })
                    }
                </ul>
            } */}
        </div>
    )
}