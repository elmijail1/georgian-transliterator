import { MdContentCopy } from "react-icons/md";
import { useOutletContext } from "react-router-dom"

export default function OutputWindow({ value, mapOutput, copyToClipboardLatestOutput }) {

    function copyToClipboardLatestOutput() {
        navigator.clipboard.writeText(value.join(""))
    }

    const language = useOutletContext()

    return (
        <div className="OutputWindow">

            {/* Header */}
            <p className="OutputWindow__Subtitle">
                {
                    language === "RU"
                        ? "На грузинский шрифт"
                        : "To Georgian script"
                }
            </p>

            {/* Output Display Div */}
            <div className="OutputWindow__Display">
                {value ?
                    mapOutput() :
                    <span className="OuputWindow__PlaceholderText">
                        {
                            language === "RU"
                            ? "...и получите грузинский текст здесь!"
                            : "...to see Georgian text here!"
                        }
                    </span>}
            </div>

            {/* Copy Button */}
            {value &&
                <div
                    className="OutputWindow__CopyDiv"
                    onClick={copyToClipboardLatestOutput}
                >
                    {
                        language === "RU"
                        ? "Копировать"
                        : "Click to copy"
                    }
                    <MdContentCopy className="OutputWindow__CopyIcon" />
                </div>}

        </div>
    )
}