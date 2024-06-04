import { useState } from "react"

export default function MapOutputTest() {

    const dictionary = [
        { lat: "a", arm: "ա" },
        { lat: "b", arm: "բ" },
        { lat: "c", arm: "ծ" },
    ]

    const [input, setInput] = useState()
    const [output, setOutput] = useState()

    const outputStyles = {
        border: "1px solid black",
        width: "10rem",
        height: "3rem",
    }

    function transliterate(string) {
        const finalArray = []
        const inputArray = string.split("")

        inputArray.map(character => {
            dictionary.map(entry => {
                console.log(character, entry)
                if (entry.lat === character) {
                    finalArray.push(entry.arm)
                }
            })
        })
        return finalArray        
    }

    function mapOutput() {
        // carry on here
    }

    function handleInput(event) {
        setInput(event.target.value)
        setOutput(transliterate(event.target.value))
    }

    return (
        <main>
            <h1>wassup</h1>
            <textarea
                value={input}
                onChange={() => handleInput(event)}
            >
            </textarea>

            <div style={outputStyles}>
                {output}
            </div>
        </main>
    )
}