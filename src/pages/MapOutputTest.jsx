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
    const [modifiedOutput, setModifiedOutput] = useState()

    const outputStyles = {
        border: "1px solid black",
        width: "10rem",
        height: "3rem",
    }

    function transliterate(string) {
        const finalArray = []
        const inputArray = string.split("")

        inputArray.map((character, index) => {
            dictionary.map(entry => {
                if (entry.lat === character) {
                    finalArray.push({ lat: character, arm: entry.arm, index: index })
                }
            })
        })
        return finalArray
    }

    function changeCharsCase(index) {
        setOutput(
            prevOutput => {
                const newArray = []
                prevOutput.map((character1, index1) => {
                    if (index1 === index) {
                        if (character1.modified) {
                            if (character1.arm == character1.arm.toLowerCase()) {
                                newArray.push(
                                    { ...character1, arm: character1.arm.toUpperCase(), modified: false }
                                )
                            } else {
                                newArray.push(
                                    { ...character1, arm: character1.arm.toLowerCase(), modified: false }
                                )
                            }
                        } else {
                            if (character1.arm == character1.arm.toLowerCase()) {
                                newArray.push(
                                    { ...character1, arm: character1.arm.toUpperCase(), modified: true }
                                )
                            } else {
                                newArray.push(
                                    { ...character1, arm: character1.arm.toLowerCase(), modified: true }
                                )
                            }
                        }
                    } else {
                        newArray.push(character1)
                    }
                })
                setModifiedOutput(newArray.filter(char => char.modified))
                return newArray
            }
        )
    }

    function mapOutput() {
        return output.map((character, index) => {
            return (
                <span
                    key={nanoid()}
                    onClick={() => changeCharsCase(index)}
                >
                    {character.arm}
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