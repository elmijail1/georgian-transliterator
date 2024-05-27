import { nanoid } from "nanoid"

function showAlternativeOptions(
    entry, index, alternativeOptions, setAlternativeOptions
) {
    if (alternativeOptions.shown && alternativeOptions.index === index) {
        setAlternativeOptions(({ shown: false, geoChar: "", latInit: "", index: null }))
    } else {
        setAlternativeOptions({ shown: true, geoChar: entry.geoChar, latInit: entry.latInit, index: index })
    }
}

function determineIfOptionsShouldBeShown(
    charIndex, activeAlternativeOption
) {
    if (activeAlternativeOption.shown && activeAlternativeOption.index === charIndex) {
        return true
    }
}

// change the current letter to the chosen alternative option
function useAlternativeOption(
    char, setLatestOutput, activeAlternativeOption, setActiveAlternativeOption
) {
    setLatestOutput(previousOutput => {
        return (
            [
                ...previousOutput,
                previousOutput[activeAlternativeOption.index].geoChar = char
            ]
        )
    })
    setActiveAlternativeOption(prevOptions => ({ ...prevOptions, geoChar: char }))
}



export function mapOutput({
    activeAlternativeOption,
    charsData,
    latestOutput,
    letterOptionRef,
    optionsDisplay,
    setActiveAlternativeOption,
    setLatestOutput,
}) {

    const triggerLetters = ["t", "y", "p", "h", "k", "ts", "ch", "c", "w", "x"]

    if (optionsDisplay) {
        return latestOutput.map((entry, index) => {
            if (triggerLetters.includes(entry.latInit)) {
                return (
                    <span
                        className={`highlighterLetter ${activeAlternativeOption.index === index && "highlighterLetter--pressed"}`}
                        key={nanoid()}
                        id={`letter-${index}`}
                        onClick={() => {
                            showAlternativeOptions(entry, index, activeAlternativeOption, setActiveAlternativeOption)
                        }}
                    >
                        {entry.geoChar}
                        {
                            determineIfOptionsShouldBeShown(index, activeAlternativeOption) &&
                            <span
                                className="aoDesktop__LetterOptions"
                                ref={letterOptionRef}
                            >
                                {
                                    charsData.filter((char) => char.lat === activeAlternativeOption.latInit)[0].options.map((char) => {
                                        if (char !== activeAlternativeOption.geoChar) {
                                            return (
                                                <div
                                                    key={nanoid()}
                                                    className="aoDesktop__LetterOptions__Letter"
                                                    onClick={() => useAlternativeOption(char, setLatestOutput, activeAlternativeOption, setActiveAlternativeOption)}
                                                >
                                                    {char}
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </span>
                        }
                    </span>
                )

            } else {
                return <span key={nanoid()}>{entry.geoChar}</span>
            }
        })

    } else {
        const outputArray = []
        latestOutput.map(entry => {
            outputArray.push(entry.geoChar)
        })
        return outputArray.join("")
    }
}



{/*
COMMENTS
*/}