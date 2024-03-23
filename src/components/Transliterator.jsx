import { nanoid } from "nanoid"
import { useState } from "react"

import { MdContentCopy } from "react-icons/md";

import transliterate from "../utilities/transliterate"

{/*
TO DO'S:
STYLING
- 1. add colors and shadows (if necessary)
- 2. see where you should keep borders and where you should remove them
- 3. handle text overflow
- 4. alternative options
FUNCTIONALITY
- 1. make copying work
- 2. handle text overflow
- 3. alternative options

*/}


export default function Transliterator() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    const [latestOutput, setLatestOutput] = useState("")

    const [history, setHistory] = useState([])

    function saveToHistory(event, latItem, geoItem) {
        event.preventDefault()
        setHistory(prevHistory => [...prevHistory, { latItem: latItem, geoItem: geoItem }])
        if (history.length > 4) {
            history.shift()
        }
        setCurrentInput("")
        setLatestOutput("")
    }

    return (
        <div>
            <div className="Header">
                <p className="Header__Title">Georgian Transliterator</p>
            </div>

            <div className="InputWindow">
                <p className="InputWindow__Subtitle">From Latin script</p>
                <form
                    method="get"
                >
                    <textarea
                        className="InputWindow__Input"
                        type="text"
                        name="currentInput"
                        id="current-input"
                        placeholder="Enter Latin text"
                        value={currentInput}
                        onChange={handleChange}
                    />
                    {/* <button onClick={() => saveToHistory(event, currentInput, latestOutput)}>Save to history</button> */}
                </form>
            </div>

            <div className="OutputWindow">
                <p className="OutputWindow__Subtitle">To Georgian script</p>
                <div className="OutputWindow__Display">
                    {latestOutput &&
                    <div className="OutputWindow__CopyDiv">
                        Click to copy
                        <MdContentCopy className="OutputWindow__CopyIcon"/>
                        </div>}
                    {latestOutput}
                </div>
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