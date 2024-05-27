// general
import { MdContentCopy } from "react-icons/md";
import { useContext } from "react"
// components
import DisplayButton from "./DisplayButton.jsx"
// context
import { TransliteratorContext } from "../../pages/Home.jsx"
// utilities
import { mapOutput } from "../../utilities/Home/mapOutput"

export default function OutputWindow() {

    const { // Context 1*
        activeAlternativeOption,
        charsData,
        language,
        latestOutput,
        letterOptionRef,
        optionsDisplay,
        setActiveAlternativeOption,
        setLatestOutput,
    } = useContext(TransliteratorContext)

    const mapOutputArguments = { // Map Output 2*
        optionsDisplay,
        latestOutput,
        activeAlternativeOption,
        setActiveAlternativeOption,
        charsData,
        letterOptionRef,
        setLatestOutput,
    }

    function copyToClipboardLatestOutput() {
        const arrayToCopy = []
        latestOutput.map(entry => arrayToCopy.push(entry.geoChar))
        navigator.clipboard.writeText(arrayToCopy.join(""))
    }

    return (
        <div className="OutputWindow">

            {/* title */}
            <p className="OutputWindow__Subtitle">
                {
                    language === "RUS"
                        ? "На грузинский шрифт"
                        : "To Georgian script"
                }
            </p>


            {/* output display */}
            <div
                className="OutputWindow__Display"
            >
                {latestOutput.length
                    ? mapOutput(mapOutputArguments)
                    :
                    <span className="OuputWindow__PlaceholderText">
                        {
                            language === "RUS"
                                ? "...и получите грузинский текст здесь!"
                                : "...to see Georgian text here!"
                        }
                    </span>}
            </div>

            {/* copy button */}
            {latestOutput &&
                <DisplayButton
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