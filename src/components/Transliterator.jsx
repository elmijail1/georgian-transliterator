import { nanoid } from "nanoid"
import { useState } from "react"

import transliterate from "../utilities/transliterate"

{/*
TO DO's
– add styling, I'm tired of seeing this squalid barebones thing

*/}


export default function TransliteratorNew() {

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
                <p className="OutputWindow__Subtitle">From Latin script</p>
                <div className="OutputWindow__Display">
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