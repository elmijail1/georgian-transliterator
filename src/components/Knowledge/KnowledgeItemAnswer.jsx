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

COMMENTS
1. What this component is
This component displays the answer text coming from the knowledgeItems array's
entry. The function "splitAnswerIntoDivsAndMap" detects linebreaks (\n\n), splits
the initial text at them, and renders the text with the detected linebreaks.
.
2. Accepted values:
- entry: it comes from knowledgeItems and represents a question-answer pair.
There are answers for both English & Russian versions of the UI.
- language: the language of the interface set by the user. It comes from the
Layout through a context.
)
*/