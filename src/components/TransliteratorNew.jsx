import {useState} from "react"

export default function TransliteratorNew() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
    }

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