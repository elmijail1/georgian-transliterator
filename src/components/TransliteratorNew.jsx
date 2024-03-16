import { useState } from "react"

import turnStringToArray from "../utilities/turnStringToArray"

{/*
TO DO's
– make a transliteration function
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

        // OK, instead of this thing we need a transliteartion function
        setLatestOutput(event.target.value)
        turnStringToArray(event.target.value)
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
                <button>Transliterate!</button>
            </form>

            <div className="Output--Window">
                {latestOutput}
            </div>

            <h2>Results:</h2>
        </div>
    )
}