import { MdContentCopy } from "react-icons/md";
import { useOutletContext } from "react-router-dom"
import { useContext } from "react"

import { TransliteratorContext } from "../pages/Transliterator.jsx"

export default function OutputWindow() {

    const {
        latestOutput,
        mapOutput,
    } = useContext(TransliteratorContext)

    function copyToClipboardLatestOutput() {
        const arrayToCopy = []
        latestOutput.map(entry => arrayToCopy.push(entry.geoChar))
        navigator.clipboard.writeText(arrayToCopy.join(""))
    }

    const language = useOutletContext()

    console.log(latestOutput)

    return (
        <div className="OutputWindow">

            {/* Header */}
            <p className="OutputWindow__Subtitle">
                {
                    language === "RUS"
                        ? "На грузинский шрифт"
                        : "To Georgian script"
                }
            </p>

            {/* Output Display Div */}
            <div className="OutputWindow__Display">
                {latestOutput.length
                    ? mapOutput()
                    :
                    <span className="OuputWindow__PlaceholderText">
                        {
                            language === "RUS"
                                ? "...и получите грузинский текст здесь!"
                                : "...to see Georgian text here!"
                        }
                    </span>}
            </div>

            {/* Copy Button */}
            {latestOutput &&
                <div
                    className="OutputWindow__CopyDiv"
                    onClick={copyToClipboardLatestOutput}
                >
                    {
                        language === "RUS"
                            ? "Копировать"
                            : "Click to copy"
                    }
                    <MdContentCopy className="OutputWindow__CopyIcon" />
                </div>}

        </div>
    )
}