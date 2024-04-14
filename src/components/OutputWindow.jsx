import { MdContentCopy } from "react-icons/md";
import { useOutletContext } from "react-router-dom"

export default function OutputWindow({ value, mapOutput }) {

    function copyToClipboardLatestOutput() {
        const arrayToCopy = []
        value.map(entry => arrayToCopy.push(entry.geoChar))
        navigator.clipboard.writeText(arrayToCopy.join(""))
    }

    const language = useOutletContext()

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
                {value ?
                    mapOutput() :
                    <span className="OuputWindow__PlaceholderText">
                        {
                            language === "RUS"
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
                        language === "RUS"
                        ? "Копировать"
                        : "Click to copy"
                    }
                    <MdContentCopy className="OutputWindow__CopyIcon" />
                </div>}

        </div>
    )
}