import { Link } from "react-router-dom"
import { MdLightbulb, MdLightbulbOutline } from "react-icons/md";

export default function ExtraTools({alternativeOptionsOn, setAlternativeOptionsOn}) {
    return (
        <div className="ExtraTools">

            {/* Header */}
            <p className="ExtraTools__Subtitle">Extra Tools</p>

            {/* Buttons Section */}
            <div className="ExtraTools__Buttons">

                {/* 1. Button: Alternative Options */}
                <div className="ExtraTools__AlternativeOptionsBox">

                    {/* 1.1. Button proper */}
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

                    {/* 1.2. Info text below the button */}
                    <div className="ExtraTools__Info">
                        Hover over highlighted buttons to see how else they can be transliterated.
                        Learn more about why it's important&nbsp;
                        <Link
                            to="/knowledge"
                            className="ExtraTools__Info--Link"
                        >
                            here
                        </Link>
                        .
                    </div>
                    
                </div>
            </div>
        </div>
    )
}