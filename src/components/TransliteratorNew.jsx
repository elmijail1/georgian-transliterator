import { useState } from "react"

import transliterate from "../utilities/transliterate"

{/*
TO DO's
– pass it to the handleChange
– make a sendToHistory function that works onSubmit
– make history a 5-item list that erases the fifth item whenever
the limit has been reached
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

    return (
        <div>
            <h1>Georgian Transliterator NEW</h1>

            <form
                method="get"
            // onSubmit={}
            >
                <input
                    type="text"
                    name="currentInput"
                    id="current-input"
                    placeholder="Enter Latin text"
                    value={currentInput}
                    onChange={handleChange}
                />
                <button>Save to history</button>
            </form>

            <div className="Output--Window">
                {latestOutput}
            </div>

            <h2>Saved history:</h2>
        </div>
    )
}