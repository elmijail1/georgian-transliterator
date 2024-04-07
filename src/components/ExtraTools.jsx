import { Link } from "react-router-dom"
import { MdLightbulb, MdLightbulbOutline } from "react-icons/md";
import { useOutletContext } from "react-router-dom"

export default function ExtraTools({ optionsDisplay, setOptionsDisplay, setAlternativeOptions }) {

    const language = useOutletContext()
    function defineLanguageHide() {
        return language === "RU" ? "Убрать" : "Hide"
    }
    function defineLanguageShow() {
        return language === "RU" ? "Показать" : "Show"
    }

    return (
        <div className="ExtraTools">

            {/* Header */}
            <p className="ExtraTools__Subtitle">
                {
                    language === "RU"
                        ? "Инструменты"
                        : "Extra Tools"
                }
            </p>

            {/* Buttons Section */}
            <div className="ExtraTools__Buttons">

                {/* 1. Button: Alternative Options */}
                <div className="ExtraTools__AlternativeOptionsBox">

                    {/* 1.1. Button proper */}
                    <button
                        className={`ExtraTools__Button ${optionsDisplay ? "ExtraTools__Button--On" : ""}`}
                        onClick={
                            () => {
                                setOptionsDisplay(prevState => !prevState)
                                setAlternativeOptions({ shown: false, geoChar: "", latInit: "", index: null })
                            }}
                    >
                        <div>
                            {optionsDisplay
                                ? <MdLightbulb id="LightBulb--On" />
                                : <MdLightbulbOutline />
                            }
                        </div>
                        <p>
                            {optionsDisplay ? defineLanguageHide() : defineLanguageShow()}
                            &nbsp;
                            {
                                language === "RU"
                                    ? "другие варианты букв"
                                    : "alternative options for letters"
                            }
                        </p>
                    </button>

                    {/* 1.2. Info text below the button */}
                    <div className="ExtraTools__Info">
                        {
                            language === "RU"
                            ? "Нажмите на подсвеченную букву, чтобы узнать, как ещё её можно перевести. Узнайте о том, почему одну букву можно перевести по-разному, "
                            : "Press a highlighted letter to see how else it can be transliterated. Learn more about why it's important "
                        }
                        <Link
                            to="/knowledge"
                            className="ExtraTools__Info--Link"
                        >
                            {
                                language === "RU"
                                ? "здесь"
                                : "here"
                            }
                        </Link>
                        .
                    </div>

                </div>
            </div>
        </div>
    )
}