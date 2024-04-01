import { MdContentCopy } from "react-icons/md";

export default function OutputWindow({value, mapOutput, copyToClipboardLatestOutput}) {

    function copyToClipboardLatestOutput() {
        navigator.clipboard.writeText(value.join(""))
    }

    return (
        <div className="OutputWindow">

            {/* Header */}
            <p className="OutputWindow__Subtitle">To Georgian script</p>

            {/* Output Display Div */}
            <div className="OutputWindow__Display">
                {value ?
                    mapOutput() :
                    <span className="OuputWindow__PlaceholderText">
                        ...to see Georgian text here!
                    </span>}
            </div>

            {/* Copy Button */}
            {value &&
                <div
                    className="OutputWindow__CopyDiv"
                    onClick={copyToClipboardLatestOutput}
                >
                    Click to copy
                    <MdContentCopy className="OutputWindow__CopyIcon" />
                </div>}
                
        </div>
    )
}