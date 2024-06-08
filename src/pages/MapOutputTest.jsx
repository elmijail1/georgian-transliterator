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
                if (!modifiedOutput || !modifiedOutput.length) {
                    if (entry.lat === character) {
                        return finalArray.push({ lat: character, arm: entry.arm, index: index })
                    }
                } else {

                    // THE DOUBLING PROBLEM IS SOMEWHERE HERE
                    // KEEP DOING STEP-BY-STEPS TO FIGURE IT OUT

                    let found = 0
                    // modifiedOutput.map((modChar) => {
                    modifiedOutput.map((modChar, modIndex) => {
                        if (found > 0) {
                            return
                        } else {
                            if (entry.lat === character && modChar.lat === character && modChar.index === index) {
                                found++
                                return finalArray.push({ lat: character, arm: modChar.arm, index: index, modified: true })
                            } else if (entry.lat === character) {
                                if (modIndex === modifiedOutput.length-1) {
                                    found++
                                    return finalArray.push({ lat: character, arm: entry.arm, index: index })
                                } else {
                                    return
                                }
                            }
                        }
                    })
                }

            })
        })
        // console.log(finalArray)
        return finalArray
    }

    function changeCharsCase(index) {
        setOutput(
            prevOutput => {
                const newArray = []
                prevOutput.map((character1) => {
                    if (character1.index === index) {
                        if (character1.modified) {
                            if (character1.arm == character1.arm.toLowerCase()) {
                                return newArray.push(
                                    { ...character1, arm: character1.arm.toUpperCase(), modified: false }
                                )
                            } else {
                                return newArray.push(
                                    { ...character1, arm: character1.arm.toLowerCase(), modified: false }
                                )
                            }
                        } else {
                            if (character1.arm == character1.arm.toLowerCase()) {
                                return newArray.push(
                                    { ...character1, arm: character1.arm.toUpperCase(), modified: true }
                                )
                            } else {
                                return newArray.push(
                                    { ...character1, arm: character1.arm.toLowerCase(), modified: true }
                                )
                            }
                        }
                    } else {
                        return newArray.push(character1)
                    }
                })
                setModifiedOutput(newArray.filter(char => char.modified))
                console.log(newArray)
                return newArray
            }
        )
    }

    function mapOutput() {
        return output.map((char, index) => {
            // if (!modifiedOutput || !modifiedOutput.length) {
            return (
                <span
                    key={nanoid()}
                    onClick={() => changeCharsCase(index)}
                >
                    {char.arm}
                </span>
            )
            // } else { // TRY MOVING THIS PART TO TRANSLITERATE
            //     modifiedOutput.map(modChar => {
            //         if (modChar.lat === char.lat && modChar.index === index) {
            //             char = { ...char, arm: modChar.arm, modified: true }
            //             return (
            //                 <span
            //                     key={nanoid()}
            //                     onClick={() => changeCharsCase(index)}
            //                 >
            //                     {char.arm}
            //                 </span>
            //             )
            //         }
            //     })
            //     return (
            //         <span
            //             key={nanoid()}
            //             onClick={() => changeCharsCase(index)}
            //         >
            //             {char.arm}
            //         </span>
            //     )
            // }
        })
    }

    function handleInput(event) {
        setInput(event.target.value)
        setOutput(transliterate(event.target.value))
    }

    // WE ALSO NEED AN EFFECT THAT WILL CHECK THE LENGTH OF THE OUTPUT AND IF
    // MODIFIED OUTPUT CONTAINS ITEMS WITH INDICES HIGHER THAN THE LENGTH OF OUTPUT,
    // SUCH ITEMS SHOULD BE REMOVED (THAT WILL PREVENT RETYPING THE SAME TEXT &
    // GETTING CHARS AUTO MODIFIED AGAIN )

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