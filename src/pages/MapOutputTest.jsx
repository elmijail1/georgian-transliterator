import { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export default function MapOutputTest() {

    {/*
    to do
    I added digraphs and now things go crazy when you click a char.
    The reason for that is that modifiedOutput's main reliance value is
    index. Diphthongs break that. There are 2 ways to handle it:
    - add alternative options to the dictionary and see how it's going
    to work with it;
    - basically reproduce all the transliterator logic of the original
    app (with a smaller dictionary of course) and see how it's going
    to work;
    - make the code slicker;
    - transfer it to the real transliterator.     
    */}

    const dictionary = [
        { lat: "a", arm: "ա" },
        { lat: "b", arm: "բ" },
        { lat: "c", arm: "ծ" },
        { lat: "s", arm: "ս" },
        { lat: "t", arm: "տ" },
        { lat: "ts", arm: "ծ" },

    ]

    const [input, setInput] = useState()
    const [output, setOutput] = useState()
    const [modifiedOutput, setModifiedOutput] = useState()

    const outputStyles = {
        border: "1px solid black",
        width: "10rem",
        height: "3rem",
    }

    console.log(output, modifiedOutput)

    function transliterate(string) {
        const finalArray = []
        const inputArray = string.split("")

        let prevChar = ""
        const digraphs = {
            total: ["t"],
            sDigraphs: ["t"],
        }

        let digraphCount = 0 // digraph counter
        inputArray.map((character, index) => {


            if (prevChar.length > 1) {
                prevChar = character
                digraphCount++ // digraph counter
                return
            }

            if (digraphs.total.includes(character)) {
                if (
                    digraphs.sDigraphs.includes(character)
                    && inputArray[index+1] === "s"
                ) {
                    character = character + "s"
                    prevChar = character
                }
            } else {
                prevChar = character
            }

            dictionary.map(entry => {
                if (!modifiedOutput || !modifiedOutput.length) {
                    if (entry.lat === character) {
                        return finalArray.push({ lat: character, arm: entry.arm, index: index - digraphCount })
                    }
                } else {

                    let found = 0
                    modifiedOutput.map((modChar, modIndex) => {
                        if (found > 0) {
                            return
                        } else {
                            if (entry.lat === character && modChar.lat === character && modChar.index === index-digraphCount) {
                                found++
                                return finalArray.push({ lat: character, arm: modChar.arm, index: index - digraphCount, modified: true })
                            } else if (entry.lat === character) {
                                if (modIndex === modifiedOutput.length - 1) {
                                    found++
                                    return finalArray.push({ lat: character, arm: entry.arm, index: index - digraphCount })
                                } else {
                                    return
                                }
                            }
                        }
                    })
                }

            })
        })
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
        })
    }

    function handleInput(event) {
        setInput(event.target.value)
        setOutput(transliterate(event.target.value))
    }

    // cleaner effect
    useEffect(() => {
        if (modifiedOutput) {
            console.log(modifiedOutput)
            setModifiedOutput((prevModifiedOutput) => {
                return prevModifiedOutput.filter((modChar) => modChar.index < output.length)
            })
            console.log(modifiedOutput)
        }
    }, [output])

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

{/*
COMMENTS

CLEANER EFFECT
Imagine a situation where you've typed in "aba" then clicked on the "b"
and it became upper case ("aBa"). Then you delete it and type "cba".
What you'll get is "cBa", although you haven't clicked that "b" after
typing "cba". The reason for that is the modifiedOutput state mechanism
that relies on the index of the output characters. So we need to remove
all the "overflow" values from that state array when we remove parts
of our input (or all of it). Hence after any output change we check if
the modifiedOutput state array contains any values that have index of
a greater value than the length of the output. All such values are
filtered and we don't get auto change in cases similar to the one
described above.

DIGRAPH COUNTER (digraphCount)
It's used inside the transliterate function to match digraphs in output
with entries in modifiedOutput. After each registered digraph in the
output, the value of the counter increments. That value is subtracted
from the regular index of the character (the regular index is naturally
the same as that of the respective character in the input). Before the
first digraph is registered, the value of the counter is 0, hence when
it's subtracted, the natural index doesn't change. The difference
between the natural index and the one with the subtracted digraphCount
widens as more digraphs are registered.

*/}