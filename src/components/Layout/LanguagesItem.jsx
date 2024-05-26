export default function LanguagesItem({ entry, language, chooseLanguage }) {
    return (
        <li
            className={
                `Lang__MenuItem
                ${language === entry.langShort ? "Lang__MenuItemActive" : ""}`
            }
            onClick={() => chooseLanguage(entry)}
        >
            {language === entry.langShort
                ? entry.langFullNative
                : entry.langFullTrans
            }
        </li>
    )
}

{/*
COMMENTS
This component represents one option in the Languages menu (Languages is a component
of the Layout page). It can be clicked to set the language to the one that it represents.
.
An additional style class is added to this component if the value of the language state
(determined in the Layout page) is the same as this component entry's value: "ENG" or
"RUS".
.
The language of the text of this component depends on the current value of the language
state. "langFullNative" & "langFullTrans" can be both English or Russian depending on
the option.
*/}