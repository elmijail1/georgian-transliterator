// utilities
import { splitAnswerIntoDivsAndMap } from "../../utilities/knowledgeUtilities"

export default function KnowledgeItemAnswer({ entry, language }) {
    return (
        <div className="KnowAnswer__GeneralDiv">
            {language === "ENG"
                ? splitAnswerIntoDivsAndMap(entry.answer)
                : splitAnswerIntoDivsAndMap(entry.answerRus)
            }
        </div>
    )
}

/*
RENDER STRUCTURE:
1. Description (split in lines at every \n\n

COMMENT
Accepted values:
- entry: it comes from knowledgeItems and represents a question-answer pair.
There are answers for both English & Russian versions of the UI.
- language: the language of the interface set by the user. It comes from the
Layout through a context.
)
*/