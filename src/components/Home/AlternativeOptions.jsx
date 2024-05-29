import { useContext } from "react"
import { useOutletContext } from "react-router-dom"
import { TransliteratorContext } from "../../pages/Home.jsx"
import { HashLink } from "react-router-hash-link"

import AlternativeOptionsMobile from "./subcomponents/AlternativeOptionsMobile.jsx";


export default function AlternativeOptions() {

    const {
        optionsDisplay,
        setActiveAlternativeOption,
        setOptionsDisplay,
    } = useContext(TransliteratorContext)

    const { language, vpWidth } = useOutletContext()

    if (vpWidth < 450) {
        return <AlternativeOptionsMobile />
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