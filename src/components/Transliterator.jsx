import { nanoid } from "nanoid"
import { useState, useEffect } from "react"

import { MdCancel, MdContentCopy, MdLightbulb, MdLightbulbOutline } from "react-icons/md";

import transliterate from "../utilities/transliterate"

{/*
TO DO'S:
- 1. Create a function that maps letters with different colors
- 2. Add an on-hover div that says what the issue with that letter is
- 3. Can we add a way to change those letters via that on-hover?
*/}


export default function Transliterator() {

    const [currentInput, setCurrentInput] = useState("")
    function handleChange(event) {
        setCurrentInput(event.target.value)
        setLatestOutput(transliterate(event.target.value))
    }

    const [latestOutput, setLatestOutput] = useState("")

    const [counter, setCounter] = useState(currentInput.length)
    useEffect(() => {
        setCounter(currentInput.length)
    }, [currentInput])

    function clearCurrentInput() {
        setCurrentInput("")
        setLatestOutput("")
    }

    function copyToClipboardLatestOutput() {
        navigator.clipboard.writeText(latestOutput.join(""))
    }

    function mapOutput() {
        const triggerLetters = ["თ", "ყ", "პ", "ჰ", "კ", "ც"]
        if (alternativeOptionsOn) {
            return latestOutput.map(ch => {
                if (triggerLetters.includes(ch)) {
                    return <span className="highlighterLetter" key={nanoid()}>{ch}</span>
                }
                return <span key={nanoid()}>{ch}</span>
            })
        } else {
            return latestOutput.join("")
        }
    }

    const [alternativeOptionsOn, setAlternativeOptionsOn] = useState(false)

    return (
        <div>
            <div className="Header">
                <div className="Header__Logo">
                    <span className="Header__Logo--tlat">t</span>
                    <span className="Header__Logo--slash">⃕</span>
                    <span className="Header__Logo--tgeo">თ</span>
                </div>
                <p className="Header__Title">Georgian Transliterator</p>
            </div>

            <div className="InputWindow">
                <p className="InputWindow__Subtitle">From Latin script</p>
                <textarea
                    className="InputWindow__Input"
                    type="text"
                    name="currentInput"
                    id="current-input"
                    placeholder="Enter Latin text here..."
                    value={currentInput}
                    onChange={handleChange}
                    maxLength="500"
                />
                <div className="InputWindow__Counter">
                    {counter > 499 && <p className="InputWindow__Counter--Red">Text limit has been reached</p>}
                    <p className={counter > 499 ? "InputWindow__Counter--Red" : ""}>{counter}/500</p>
                </div>
                {currentInput &&
                    <div
                        className="InputWindow__ClearDiv"
                        onClick={clearCurrentInput}
                    >
                        Click to clear
                        <MdCancel className="OutputWindow__CopyIcon" />
                    </div>
                }
            </div>

            <div className="OutputWindow">
                <p className="OutputWindow__Subtitle">To Georgian script</p>
                <div className="OutputWindow__Display">
                    {latestOutput ?
                        mapOutput() :
                        <span className="OuputWindow__PlaceholderText">
                            ...to see Georgian text here!
                        </span>}
                </div>
                {latestOutput &&
                    <div
                        className="OutputWindow__CopyDiv"
                        onClick={copyToClipboardLatestOutput}
                    >
                        Click to copy
                        <MdContentCopy className="OutputWindow__CopyIcon" />
                    </div>}
            </div>

            <div className="ExtraTools">
                <p className="ExtraTools__Subtitle">Extra Tools</p>
                <div className="ExtraTools__Buttons">
                    <div className="ExtraTools__AlternativeOptionsBox">
                        <button
                            className={`ExtraTools__Button ${alternativeOptionsOn ? "ExtraTools__Button--On" : ""}`}
                            onClick={() => setAlternativeOptionsOn(prevState => !prevState)}
                        >
                            <div>
                                {alternativeOptionsOn
                                    ? <MdLightbulb id="LightBulb--On" />
                                    : <MdLightbulbOutline />
                                }
                            </div>
                            <p>
                                {alternativeOptionsOn ? "Hide" : "Show"} alternative options for letters
                            </p>
                        </button>
                        <div className="ExtraTools__Info">
                            Hover over highlighted buttons to see how else they can be transliterated.
                            Learn more about why it's important&nbsp;
                            <a className="ExtraTools__Info--Link">here</a>.
                        </div>
                    </div>

                    {/* <div>Add translation</div> */}
                </div>
            </div>
        </div>
    )
}