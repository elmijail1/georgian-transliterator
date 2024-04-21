import { nanoid } from "nanoid"


export default function AlternativeOptions({language, alternativeOptions, setAlternativeOptions, useAlternativeOption, charsData}

) {
    return (
        <div className="AlternativeOptions__Div">
            <p className="AlternativeOptions__Subtitle">
                {
                    language === "RUS"
                        ? "Варианты перевода"
                        : "Alternative options"
                }
            </p>
            <p className="AlternativeOptions__Description">
                {
                    language === "RUS"
                        ? `Вот как ещё можно перевести эту букву
            (нажмите на предложенную букву, чтобы заменить
                нынешнюю букву на неё).`
                        : `Other ways to transliterate this character
                (you can click a suggested character to
                    replace the current one with it).`
                }
            </p>
            <p
                className="AlternativeOptions__Cross"
                onClick={() => setAlternativeOptions(({ shown: false, geoChar: "", latInit: "", index: null }))}
            >
                ╳
            </p>
            <div className="AlternativeOptions__CharDisplay">
                {
                    charsData.filter((char) => char.lat === alternativeOptions.latInit)[0].options.map((char) => {
                        if (char !== alternativeOptions.geoChar) {
                            return (
                                <div
                                    className="AlternativeOptions__SingleChar"
                                    key={nanoid()}
                                    onClick={() => useAlternativeOption(char)}
                                >
                                    {char}
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}