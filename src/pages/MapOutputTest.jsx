import { useState } from "react"
import { nanoid } from "nanoid"

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
                if (entry.lat === character) {
                    finalArray.push(entry.arm)
                    // finalArray.push({lat: character, arm: entry.arm})
                }
            })
        })
        return finalArray
    }

    console.log(output)

    function mapOutput() {
        return output.map((character, index) => {
            return (
                <span
                    key={nanoid()}
                    onClick={
                        () => setOutput(
                            prevOutput => {
                                const newArray = []
                                prevOutput.map((character1, index1) => {
                                    if (index1 === index) {
                                        if (character1 == character1.toLowerCase()) {
                                            newArray.push(character1.toUpperCase())
                                        } else {
                                            newArray.push(character1.toLowerCase())
                                        }
                                    } else {
                                        newArray.push(character1)
                                    }
                                })
                                return newArray
                            }
                        )
                    }
                >
                    {character}
                </span>
            )
        })
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
                {
                    output?.length
                        ? mapOutput()
                        : ""
                }
            </div>
        </main>
    )
}