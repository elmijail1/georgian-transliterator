import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { HashLink } from "react-router-hash-link"
import { TransliteratorContext } from "../../pages/Home.jsx"

import { MdLightbulbOutline, MdLightbulb } from "react-icons/md";


export default function AlternativeOptions() {

    const {
        optionsDisplay,
        setActiveAlternativeOption,
        setOptionsDisplay,
    } = useContext(TransliteratorContext)

    const { language, vpWidth } = useOutletContext()

    if (vpWidth < 450) {
        return (
            <div
                className="aoMobile__General"
            >
                <button
                    className={`
                    aoMobile__Button
                    ${optionsDisplay ? "aoMobile__ButtonActive" : null}
                    `}
                    onClick={() => {
                        setOptionsDisplay(prevOptions => !prevOptions)
                        setActiveAlternativeOption(({ shown: false, geoChar: "", latInit: "", index: null }))
                    }}>
                    {
                        optionsDisplay
                            ? <MdLightbulb className="aoMobile__ButtonBulbActive" />
                            : <MdLightbulbOutline className="aoMobile__ButtonBulb" />
                    }
                    <div className="aoMobile__ButtonText">
                        {
                            language === "RUS"
                                ? `${optionsDisplay ? "Спрятать" : "Показать"} альтернативные опции перевода букв`
                                : `${optionsDisplay ? "Hide" : "Show"} alternative options for letters`
                        }
                    </div>
                </button>
                <div className="aoMobile__Description">
                    {
                        language === "RUS"
                            ? "Нажмите на подсвеченную букву, чтобы узнать, как ещё её можно перевести. Узнайте о том, почему одну букву можно перевести по-разному, "
                            : "Press a highlighted letter to see how else it can be transliterated. Learn more about why it's important "
                    }
                    <HashLink
                        smooth
                        to="/knowledge#item-5"
                        className="ExtraTools__Info--Link"
                    >
                        {
                            language === "RUS"
                                ? "здесь"
                                : "here"
                        }
                    </HashLink>
                </div>
            </div>
        )
    }

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
                    setActiveAlternativeOption(({ shown: false, geoChar: "", latInit: "", index: null }))
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
                        <HashLink
                            smooth
                            to="/knowledge#item-5D"
                            className="ExtraTools__Info--Link"
                        >
                            {
                                language === "RUS"
                                    ? "здесь"
                                    : "here"
                            }
                        </HashLink>
                    </div>
                </div>
            </div>

        </div >
    )
}