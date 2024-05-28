// general
import { useContext, useRef } from "react"
import { useOutletContext } from "react-router-dom"
// components
import WindowButton from "./subcomponents/WindowButton.jsx"
// data
import { charsData } from "../../data/charsData.js"
// context
import { TransliteratorContext } from "../../pages/Home.jsx"
// utilities
import { mapOutput } from "../../utilities/Home/mapOutput.jsx"
import { useElsewhereClick } from "../../utilities/useElsewhereClick.js"
// icons
import { MdContentCopy } from "react-icons/md";

export default function OutputWindow() {

    const {
        activeAlternativeOption,
        latestOutput,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
    } = useContext(TransliteratorContext)

    const { language } = useOutletContext()

    let letterOptionRef = useRef()
    let handler = (e) => {
        if (letterOptionRef.current && !letterOptionRef.current.contains(e.target)) {
            setActiveAlternativeOption({ shown: false, char: "", initLat: "", index: null })
        }
    }
    useElsewhereClick(() => handler(event))


    function copyToClipboardLatestOutput() {
        const arrayToCopy = []
        latestOutput.map(entry => arrayToCopy.push(entry.geoChar))
        navigator.clipboard.writeText(arrayToCopy.join(""))
    }

    const mapOutputArguments = {
        optionsDisplay,
        latestOutput,
        activeAlternativeOption,
        setActiveAlternativeOption,
        charsData,
        letterOptionRef,
        setLatestOutput,
    }

    return (
        <div className="OutputWindow">

            {/* title */}
            <p className="OutputWindow__Subtitle">
                {language === "ENG" ? "To Georgian script" : "На грузинский шрифт"}
            </p>


            {/* output display */}
            <div className="OutputWindow__Display">
                {latestOutput.length
                    ? mapOutput(mapOutputArguments)
                    :
                    <span className="OuputWindow__PlaceholderText">
                        {language === "ENG"
                            ? "...to see Georgian text here!"
                            : "...и получите грузинский текст здесь!"
                        }
                    </span>}
            </div>

            {/* copy button */}
            {latestOutput &&
                <WindowButton
                    className="OutputWindow__CopyDiv"
                    onClick={copyToClipboardLatestOutput}
                    language={language}
                    text={{ eng: "Click to copy", rus: "Копировать" }}
                    icon={<MdContentCopy className="OutputWindow__CopyIcon" />}
                />
            }

        </div>
    )
}