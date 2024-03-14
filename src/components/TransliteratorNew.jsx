import { useState } from "react"

export default function TransliteratorNew() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
    }

    const [history, setHistory] = useState([])
    // ON SUBMIT FUNCTION
    // Before activating it, decalte the output
    // function addTransliterationToHistory() {
    //     setHistory((prevHistory) => {
    //         prevHistory.push({input: currentInput, output: currentOutput})
    //     })
    //     setCurrentInput("")
    // }

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

            <h2>Results:</h2>
        </div>
    )
}