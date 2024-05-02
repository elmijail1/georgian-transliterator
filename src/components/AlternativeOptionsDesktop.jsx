import { useContext } from "react"
import { Link } from "react-router-dom"
import { TransliteratorContext } from "../pages/Transliterator.jsx"

export default function AlternativeOptionsDesktop() {

    const {
        language,
        optionsDisplay,
        setAlternativeOptions,
        setOptionsDisplay,
    } = useContext(TransliteratorContext)

    console.log(optionsDisplay)

    return (
        <div
            className="aoDesktop__General"
        >
            <input
                type="checkbox"
                id="aoDesktop__Checkbox"
                checked={optionsDisplay ? true : false}
                onChange={() => {
                    setOptionsDisplay(prevOptions => !prevOptions)
                    setAlternativeOptions(({ shown: false, geoChar: "", latInit: "", index: null }))
                }}
            />
            
            <label htmlFor="aoDesktop__Checkbox" id="aoDesktop__SwitchLabel"></label>

            <div className="aoDesktop__RightBox">
                <label htmlFor="aoDesktop__Checkbox">
                    {
                        language === "RUS"
                            ? `${optionsDisplay ? "Спрятать" : "Показать"} альтернативные опции перевода букв`
                            : `${optionsDisplay ? "Hide" : "Show"} alternative options for letters`
                    }
                </label>
                <div className="aoDesktop__TooltipButton">
                    {
                        language === "RUS"
                            ? "Что это значит?"
                            : "What does it mean?"
                    }
                    <div className="aoDesktop__TooltipText">
                        {
                            language === "RUS"
                                ? "Нажмите на подсвеченную букву, чтобы узнать, как ещё её можно перевести. Узнайте о том, почему одну букву можно перевести по-разному, "
                                : "Press a highlighted letter to see how else it can be transliterated. Learn more about why it's important "
                        }
                        <Link
                            to="/knowledge"
                            className="ExtraTools__Info--Link"
                        >
                            {
                                language === "RUS"
                                    ? "здесь"
                                    : "here"
                            }
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}